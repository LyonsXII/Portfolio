import numpy as np
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from sklearn.preprocessing import OneHotEncoder
from sklearn.utils.class_weight import compute_class_weight
from sklearn.model_selection import train_test_split
from transformers import BertTokenizerFast
from transformers import TFBertModel
import tensorflow as tf
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Model
from keras.utils import custom_object_scope
from tensorflow.keras.callbacks import EarlyStopping
import pickle

nltk.download('stopwords', quiet=True)

def import_dataset():
  import os

  current_dir = os.path.dirname(os.path.realpath(__file__))
  root = os.path.join(current_dir, "public/books")

  data = []

  # Loop through author and book folders, adding .txt file contents to data with matching labels
  for author in os.listdir(root):
      author_path = os.path.join(root, author)

      for book in os.listdir(author_path):
          book_path = os.path.join(author_path, book)

          for chapter in os.listdir(book_path):
              chapter_path = os.path.join(book_path, chapter)
              
              with open(chapter_path, 'r', encoding='utf-8') as file:
                  text = file.read()
                  
              data.append({
                  'Author': author,
                  'Book': book,
                  'Chapter': chapter[:-4],
                  'Text': text
              })

  return pd.DataFrame(data)

def build_model(epochs=7, batch_size=8):

  def clean_text(text, ps, all_stopwords):
    # Clean text
    text = text.lower()  # Lowercase
    text = re.sub(r'\n', " ", text)  # Newlines
    text = re.sub(r'[^a-zA-Z\s]', " ", text)  # Punctuation and special characters
    text = re.sub(r'\s+', ' ', text).strip()  # Extra spaces

    # Apply corpus
    words = text.split()
    words = [ps.stem(word) for word in words if word not in all_stopwords]
    processed_text = " ".join(words)

    return processed_text

  def fragment_text(text, fragment_size, overlap):
    # Split text into fragments of fragment_size length, returns array of fragments
    words = text.split()
    current_text_fragments = []
    
    step_size = fragment_size - overlap  
    
    for i in range(0, len(words), step_size):
        current_fragment = " ".join(words[i:i + fragment_size])
        current_text_fragments.append(current_fragment)

        # Handle situation where final chapter fragment is already contained in the previous fragment
        if len(words) - i < fragment_size:
            break
        
    return current_text_fragments

  def preprocess_text(dataset, fragment_size, overlap):
    ps = PorterStemmer()
    all_stopwords = stopwords.words('english')
    all_stopwords.remove('not')

    # Apply our cleaning and create a new dataset to replace our previous one, this time with processed text
    text_fragments = []
    for index, row in dataset.iterrows():
        text = row["Text"]
        text = clean_text(text, ps, all_stopwords)
        current_text_fragments = fragment_text(text, fragment_size, overlap)
        
        for text_fragment in current_text_fragments:
            text_fragments.append({
                "Book": row["Book"],
                "Author": row["Author"],
                "Text": text_fragment
            })

    # Convert the data fragments into a Pandas DataFrame and replace the original
    return pd.DataFrame(text_fragments)

  def encode(y):
    # Reshape y to a 2D array (needed for OneHotEncoder)
    y_reshaped = y.reshape(-1, 1)

    # Create and fit OneHotEncoder
    encoder = OneHotEncoder(sparse_output=False)
    y_encoded = encoder.fit_transform(y_reshaped)

    # Creating class weights (in order to reduce overfitting from imbalanced data size per author)
    y_class_indices = np.argmax(y_encoded, axis=-1)

    class_weights = compute_class_weight(
        'balanced', 
        classes=np.unique(y_class_indices), 
        y=y_class_indices
    )

    # Creating class weights dictionary
    class_weight_dict = {i: class_weights[i] for i in range(len(class_weights))}

    return [y_encoded, class_weight_dict]

  def tokenize(X, y_encoded):
    # Remove empty strings after .strip() applied
    # There shouldn't be any but BERT tokeniser fails if not done
    X = [x for x in X if x.strip() != '']

    # Split into train / test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size = 0.2, random_state = 1)

    # Max length chosen based on token distribution coming from fragment size to minimise truncation
    # Edit if changing fragment_size, or optionally remove  entirely though this should be less efficient
    tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')

    X_tokenized = tokenizer(
        X_train, 
        padding=True, 
        truncation=True,
        max_length=330,
        return_tensors='tf'
    )

    X_test_tokenized = tokenizer(
        X_test, 
        padding=True, 
        truncation=True,
        max_length=330,
        return_tensors='tf'
    )

    return [X_tokenized, X_test_tokenized, y_train, y_test, tokenizer]

  def create_model(learning_rate=2e-5, dropout_rate=0.3, freeze=4):
    # Create base model
    bert_model = TFBertModel.from_pretrained('bert-base-uncased')

    # Freeze all layers, then unfreeze the number provided
    for layer in bert_model.layers:
        layer.trainable = False
    for layer in bert_model.layers[-freeze:]:  
        layer.trainable = True

    # Define input layers
    input_ids = tf.keras.layers.Input(shape=(330,), dtype=tf.int32, name="input_ids")
    attention_mask = tf.keras.layers.Input(shape=(330,), dtype=tf.int32, name="attention_mask")
    
    # Define output
    bert_output = bert_model([input_ids, attention_mask])
    pooled_output = bert_output.pooler_output
    
    # Add dropout (prevent overfitting)
    dropout = Dropout(dropout_rate)(pooled_output)
    
    # Create classification layers
    num_authors = len(dataset['Author'].unique())
    output = Dense(num_authors, activation="softmax")(dropout)
    
    # # Create model
    model = Model(inputs=[input_ids, attention_mask], outputs=output)
    
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )

    return model

  def train_model(model, epochs=50, batch_size=8):
    # Define early stopping, reverts back to last epoch with improvement after hitting a wall
    early_stopping = EarlyStopping(
        monitor='val_loss',         # Monitor validation loss
        patience=3,                 # Stop after 3 epochs with no improvement
        restore_best_weights=True   # Restore model weights from the best epoch
    )

    # Label input ids and attention mask for BERT (from BERT tokenizer), for the sake of convienience
    train_input_ids = X_tokenized['input_ids']
    train_attention_mask = X_tokenized['attention_mask']
    test_input_ids = X_test_tokenized['input_ids']
    test_attention_mask = X_test_tokenized['attention_mask']

    # Train the model
    model.fit(
        [train_input_ids, train_attention_mask],
        y_train,
        batch_size=batch_size,
        epochs=epochs,
        validation_data=([test_input_ids, test_attention_mask], y_test),
        callbacks=[early_stopping]
    )

    return model

  # Import Dataset
  dataset = import_dataset()

  # Preprocess text
  fragment_size = 200
  overlap = 50
  dataset = preprocess_text(dataset, fragment_size, overlap)

  # Encode & tokenize
  X = dataset["Text"].values
  y = dataset["Author"].values

  y_encoded, class_weight_dict = encode(y)
  X_tokenized, X_test_tokenized, y_train, y_test, tokenizer = tokenize(X, y_encoded)

  # Create the BERT model
  learning_rate = 1e-5
  dropout_rate = 0.4
  freeze = 4

  # Create model
  model = create_model(learning_rate=learning_rate, dropout_rate=dropout_rate, freeze=freeze)

  # Train model
  model = train_model(model, epochs=epochs, batch_size=batch_size)

  # Save model
  model.save("./models/Author Analysis - BERT.h5")
  with open("./models/Author Analysis - BERT.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

def predict(text):
  with custom_object_scope({"TFBertModel": TFBertModel}):
    model = tf.keras.models.load_model("./models/Author Analysis - BERT.h5")
  with open("./models/Author Analysis - BERT.pkl", "rb") as f:
      tokenizer = pickle.load(f)

  X_test_tokenized = tokenizer(
    text, 
    padding='max_length',
    truncation=True,
    max_length=330,
    return_tensors='tf'
  )

  # Make predictions on the test data
  predictions = model.predict([X_test_tokenized['input_ids'], X_test_tokenized['attention_mask']])

  # Get the predicted class
  predicted_class = predictions.argmax(axis=-1)
  
  # Map predicted class to author name
  dataset = import_dataset()
  author_names = dataset['Author'].unique()
  author_mapping = {index: author for index, author in enumerate(author_names)}

  author_weights = []
  for i in range(len(author_names) - 1):
    author_weights.append([float(predictions[0][i]), author_mapping[i]])
  author_weights.sort(key=lambda x: x[0], reverse=True)

  prediction = {
    "predicted_author": author_names[predicted_class[0]],
    "author_weights": author_weights
  }

  return prediction

# build_model(epochs=7, batch_size=8)
# text = "He is born again! I feel him! The Dragon takes his first breath on the slopes of Dragonmount! He is coming! He is coming! Light help us! Light help the world! He lies in the snow and cries like the thunder! He burns like the sun!"
# print(predict(text=text))