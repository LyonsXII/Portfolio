import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3"

import numpy as np
import pandas as pd
import re
import matplotlib.pyplot as plt
import tensorflow as tf
from tensorflow.keras import mixed_precision
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping
from keras.utils import custom_object_scope
from transformers import BertTokenizerFast
from transformers import TFBertModel
from sklearn.preprocessing import OneHotEncoder
from sklearn.utils.class_weight import compute_class_weight
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import StratifiedKFold, cross_val_score
import pickle

# Enable keras mixed precision (improves training speed)
mixed_precision.set_global_policy('mixed_float16')

# Dataset fragmentation parameters
fragment_size = [200] # Provide in descending order to avoid overlap issues
# Model parameters
learning_rate = 2e-5
dropout_rate = 0.4
unfreeze = 4  # Bert_base has 12 layers total
epochs = 100  # Early stopping will end prematurely after improvement stops
batch_size = 8

# Fundamental functions
def import_dataset():
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
              'Title': book,
              'Text': text
            })

  return pd.DataFrame(data)

def clean_text(text):
  # Clean text
  text = text.lower()  # Lowercase
  text = re.sub(r'\n', " ", text)  # Newlines
  text = re.sub(r'[^a-zA-Z\s]', " ", text)  # Punctuation and special characters
  text = re.sub(r'\s+', ' ', text).strip()  # Extra spaces

  return text

def fragment_text(text, fragment_size):
  # Split text into fragments of fragment_size length, returns array of fragments
  words = text.split()
  current_text_fragments = []

  pos = 0
  count = 0

  while pos < len(words):
    curr_count = count % len(fragment_size)
    if pos > 0:
      pos -= min(fragment_size[curr_count] // 4, 10)
    current_fragment = " ".join(words[pos:pos + fragment_size[curr_count]])
    current_text_fragments.append(current_fragment)
    
    pos += fragment_size[curr_count]
    count += 1

  return current_text_fragments

def preprocess_text(dataset, fragment_size):
  # Apply our cleaning and create a new dataset to replace our previous one, this time with processed text
  text_fragments = []
  for index, row in dataset.iterrows():
      text = row["Text"]
      text = clean_text(text)
      current_text_fragments = fragment_text(text, fragment_size)
      
      for text_fragment in current_text_fragments:
          text_fragments.append({
              "Title": row["Title"],
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

  return y_encoded, class_weight_dict

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
      padding="max_length", 
      truncation=True,
      max_length=330,
      return_tensors='tf'
  )

  X_test_tokenized = tokenizer(
      X_test, 
      padding="max_length", 
      truncation=True,
      max_length=330,
      return_tensors='tf'
  )

  return X_tokenized, X_test_tokenized, y_train, y_test, tokenizer

def prepare_training_data(fragment_size):
    # Import Dataset
    dataset = import_dataset()

    # Preprocess text
    dataset = preprocess_text(dataset, fragment_size)

    # Encode & tokenize
    X = dataset["Text"].values
    y = dataset["Author"].values

    y_encoded, class_weight_dict = encode(y)
    X_tokenized, X_test_tokenized, y_train, y_test, tokenizer = tokenize(X, y_encoded)

    return dataset, X_tokenized, X_test_tokenized, y_train, y_test, tokenizer, class_weight_dict

# Primary functions
# Build model using dataset
def build_model(fragment_size, epochs, batch_size):
  def create_model(dataset, learning_rate=2e-5, dropout_rate=0.3, unfreeze=4):
    # Create base model
    bert_model = TFBertModel.from_pretrained('bert-base-uncased')

    # Freeze all layers, then unfreeze the number provided
    for layer in bert_model.layers:
        layer.trainable = False
    for layer in bert_model.layers[-unfreeze:]:  
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

    # # Create model and define optmizer
    model = Model(inputs=[input_ids, attention_mask], outputs=output)
    optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)

    model.compile(
        optimizer=optimizer,
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )

    return model, optimizer

  def train_model(model, class_weight_dict, epochs=50, batch_size=8):
    # Define early stopping, reverts back to last epoch with improvement after hitting a wall
    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=3,
        restore_best_weights=True 
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
        class_weight=class_weight_dict,
        validation_data=([test_input_ids, test_attention_mask], y_test),
        callbacks=[early_stopping]
    )

    return model

  dataset, X_tokenized, X_test_tokenized, y_train, y_test, tokenizer, class_weight_dict = prepare_training_data(fragment_size)

  # Create the BERT model
  model, optimizer = create_model(dataset, learning_rate=learning_rate, dropout_rate=dropout_rate, unfreeze=unfreeze)

  # Train model
  model = train_model(model=model, class_weight_dict=class_weight_dict, epochs=epochs, batch_size=batch_size)

  # Save model
  model.save("./models/Author Analysis - BERT.h5")
  with open("./models/Author Analysis - BERT.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

# Produce author weightings for input text
def predict_author(text):
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  model_path = os.path.join(curr_dir, "models", "Author Analysis - BERT.h5")
  tokenizer_path = os.path.join(curr_dir, "models", "Author Analysis - BERT.pkl")

  with custom_object_scope({"TFBertModel": TFBertModel}):
    model = tf.keras.models.load_model(model_path)
  with open(tokenizer_path, "rb") as f:
      tokenizer = pickle.load(f)

  text = clean_text(text)

  new_text_tokenized = tokenizer(
    text, 
    padding='max_length',
    truncation=True,
    max_length=330,
    return_tensors='tf'
  )

  # Make predictions on the test data
  predictions = model.predict([new_text_tokenized['input_ids'], new_text_tokenized['attention_mask']])
  
  # Map predicted class to author name
  dataset = import_dataset()
  author_names = dataset['Author'].unique()
  author_mapping = {index: author for index, author in enumerate(author_names)}

  author_weights = []
  for i in range(len(author_names) - 1):
    author_weights.append([float(predictions[0][i]), author_mapping[i]])
  author_weights.sort(key=lambda x: x[0], reverse=True)

  return author_weights

# Plot token distribution, useful if changing fragment size
  # Need to change tokenizer to not use padding, set padding to False and remove tf definition line in Tokenizer
def token_distribution(fragment_size):
  # Import Dataset
  dataset = import_dataset()

  # Preprocess text
  dataset = preprocess_text(dataset, fragment_size)

  # Encode & tokenize
  X = dataset["Text"].values
  y = dataset["Author"].values

  y_encoded, class_weight_dict = encode(y)
  X_tokenized, X_test_tokenized, y_train, y_test, tokenizer = tokenize(X, y_encoded)

  token_counts = []
  for fragment in X_tokenized["input_ids"]:
    token_counts.append(len(fragment))

  # Plotting the token distribution
  plt.figure(figsize=(10, 6))
  plt.hist(token_counts, bins=range(min(token_counts), max(token_counts) + 1), edgecolor='black')
  plt.title("Token Distribution Across Fragments")
  plt.xlabel("Number of Tokens")
  plt.ylabel("Frequency")
  plt.savefig("./models/token_distribution.png", dpi=300, bbox_inches="tight")
  plt.close()

# Evaluate model and then perform a quick sanity check
def evaluate(fragment_size):
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  model_path = os.path.join(curr_dir, "models", "Author Analysis - BERT.h5")

  with custom_object_scope({"TFBertModel": TFBertModel}):
    model = tf.keras.models.load_model(model_path)

  dataset, X_tokenized, X_test_tokenized, y_train, y_test, tokenizer, class_weight_dict = prepare_training_data(fragment_size)

  # Write evaluated metrics to file
  with open("./models/Evalutation Report.txt", "w") as f:
    test_input_ids = X_test_tokenized['input_ids']
    test_attention_mask = X_test_tokenized['attention_mask']
    y_pred = model.predict([test_input_ids, test_attention_mask])
    y_pred_classes = np.argmax(y_pred, axis=1)
    y_true_classes = np.argmax(y_test, axis=1)

    # Increase line width to allow confusion matrix to print properly
    np.set_printoptions(linewidth=200)

    f.write("Confusion Matrix:\n")
    f.write(f"{np.array2string(confusion_matrix(y_true_classes, y_pred_classes))}")
    f.write("\n\nClassification Report:\n")
    f.write(f"{classification_report(y_true_classes, y_pred_classes)}\n")

    loss, accuracy = model.evaluate(
      [test_input_ids, test_attention_mask],
      y_test
    )

    f.write(f"Test Loss: {loss}\n")
    f.write(f"Test Accuracy: {accuracy}\n\n")

    # Testing model on data not contained within original dataset
    tests_path = os.path.join(curr_dir, "./public/tests (gutenberg-bulk)")

    num_correct = 0
    total = 0
    for author in os.listdir(tests_path):
        test_file_path = os.path.join(tests_path, author)
        
        with open(test_file_path, 'r', encoding='utf-8') as file:
            new_text = file.read()

        processed_new_text = clean_text(new_text)
        
        new_text_tokenized = tokenizer(
          processed_new_text, 
          padding='max_length',
          truncation=True,
          max_length=330,
          return_tensors='tf'
        )

        # Make predictions on the test data
        predictions = model.predict([new_text_tokenized['input_ids'], new_text_tokenized['attention_mask']])
        
        # Get the predicted class
        predicted_classes = predictions.argmax(axis=-1)  # Get the index of the highest probability
        
        # Map to predicted class to author name
        dataset = import_dataset()
        author_names = dataset['Author'].unique()
        author_mapping = {index: author for index, author in enumerate(author_names)}
        predicted_author = [author_mapping[i] for i in predicted_classes]
        
        f.write(f"Prediction: {predicted_author[0]} vs Actual: {author[:-4]}\n")

        if (predicted_author[0] == author[:-4]):
           num_correct += 1
        total += 1
    
    print(f"Test Loss: {loss}\n")
    print(f"Test Accuracy: {accuracy}")
    print(f"Sanity check: {round(num_correct / total, 2)}")

# Naive bayes model, useful as a benchmark
  # Works well at 8 authors but collapses at 24
def build_naive_bayes():
  # Import Dataset
  dataset = import_dataset()

  # Preprocess text
  dataset = preprocess_text(dataset, fragment_size)

  X = dataset["Text"].values
  y = dataset["Author"].values

  X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 1)

  vectorizer = TfidfVectorizer(
    stop_words='english',    # Remove common stopwords if they don't carry stylistic information
    max_df=0.95,             # Optionally ignore words that appear in too many documents
    min_df=5                 # Optionally ignore rare words that might be noise
  )

  X_train_vec = vectorizer.fit_transform(X_train)
  X_test_vec = vectorizer.transform(X_test)

  # Create the model instance
  nb_model = MultinomialNB()

  # Create Stratified K-Fold object
  cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

  # Evaluate the model using K-fold cross-validation
  author_names = dataset['Author']
  scores = cross_val_score(nb_model, X_train_vec, y_train, cv=cv, scoring='accuracy')
  print("Mean Accuracy: {:.2f}%".format(scores.mean() * 100))

  # Fit model
  nb_model.fit(X_train_vec, y_train)

  # Evaluate on the hold-out test set
  test_accuracy = nb_model.score(X_test_vec, y_test)
  print("Test Accuracy: {:.2f}%".format(test_accuracy * 100))

  # Save model and vectorizer
  with open('./models/Author Analysis - Naive Bayes.pkl', 'wb') as file:
    pickle.dump(nb_model, file)
  with open('./models/Author Analysis - Naive Bayes - Vectorizer.pkl', 'wb') as file:
    pickle.dump(vectorizer, file)

def evaluate_naive_bayes():
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  model_path = os.path.join(curr_dir, "models", "Author Analysis - Naive Bayes.pkl")
  vectorizer_path = os.path.join(curr_dir, "models", "Author Analysis - Naive Bayes - Vectorizer.pkl")

  with open(model_path, "rb") as file:
    nb_model = pickle.load(file)
  with open(vectorizer_path, "rb") as file:
    vectorizer = pickle.load(file)

  # Sanity check, complete set of tests, one for each author, using text not in dataset
  tests_path = os.path.join(curr_dir, "public", "tests")

  for author in os.listdir(tests_path):
    test_file_path = os.path.join(tests_path, author)
    
    with open(test_file_path, 'r', encoding='utf-8') as file:
        new_text = file.read()

    # Process text, apply tf-idf, and use model to predict author
    processed_new_text = clean_text(new_text)
    encoded_new_text = vectorizer.transform([processed_new_text])
    predicted_author = nb_model.predict(encoded_new_text)
    
    print(f"Predicted: {predicted_author} vs Actual: {author[:-4]}")