import os

import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from transformers import BertTokenizerFast
from transformers import TFBertModel
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.callbacks import EarlyStopping
from keras.utils import custom_object_scope
import pickle

# Custom loss function, required to be defined when model created and or loaded
# Used to give increased weight to stronger emotions, due to comparitively lower presence in Emobank dataset
def weighted_mse(y_true, y_pred):
  # Compute element-wise squared errors; shape: (batch_size, 3)
  errors = tf.square(y_true - y_pred)
  
  # Compute the mean of y_true for each output dimension; shape: (1, 3)
  mean_y_true = tf.reduce_mean(y_true, axis=0, keepdims=True)
  
  # Compute weights for each element: 1 + abs(y_true - mean_y_true)
  # This gives a tensor of shape: (batch_size, 3)
  weights = 1 + tf.abs(y_true - mean_y_true)

  # Multiply element-wise errors by weights
  weighted_errors = errors * weights  # shape: (batch_size, 3)
  
  # Return the mean of all weighted errors as a scalar
  return tf.reduce_mean(weighted_errors)

def build_emotion_model():
  def prepare_data():
    dataset = pd.read_csv("./public/datasets/EmoBank Dataset.csv")
    dataset = dataset[dataset['text'].notna()]

    X = dataset["text"].values
    y = dataset.iloc[:, 2:5].values

    # Remove empty strings, needed for BERT tokeniser
    X = [x for x in X if x.strip() != '']

    # Split into train / test sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 1)

    # Max length chosen based on data set size after tokenization
    tokenizer = BertTokenizerFast.from_pretrained('bert-base-uncased')

    X_train_tokenized = tokenizer(
      X_train, 
      padding="max_length", 
      truncation=True,
      max_length=50,
      return_tensors='tf'
    )

    X_test_tokenized = tokenizer(
      X_test, 
      padding="max_length", 
      truncation=True,
      max_length=50,
      return_tensors='tf'
    )

    return X_train_tokenized, X_test_tokenized, y_train, y_test, tokenizer

  def create_model(learning_rate=2e-5, dropout_rate=0.3, freeze=4):
    # Load pretrained BERT model
    bert_model = TFBertModel.from_pretrained('bert-base-uncased')

    # Freeze all layers, then unfreeze the number provided
    for layer in bert_model.layers:
        layer.trainable = False
    for layer in bert_model.layers[-freeze:]:  
        layer.trainable = True

    # Define input layers
    input_ids = tf.keras.layers.Input(shape=(50,), dtype=tf.int32, name="input_ids")
    attention_mask = tf.keras.layers.Input(shape=(50,), dtype=tf.int32, name="attention_mask")
    
    # Define output
    bert_output = bert_model([input_ids, attention_mask])
    pooled_output = bert_output.pooler_output
    
    # Add dropout (prevent overfitting)
    dropout = Dropout(dropout_rate)(pooled_output)

    # Create classification layers
    emoBank_options = 3
    output = Dense(emoBank_options, activation="linear")(dropout)
    
    # # Create model
    model = Model(inputs=[input_ids, attention_mask], outputs=output)

    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
        loss=weighted_mse,
        metrics=["mse", "mae"]
    )

    return model

  def train_model(model, epochs=50, batch_size=8):
    # Define early stopping, reverts back to last epoch with improvement after hitting a wall
    early_stopping = EarlyStopping(
        monitor='val_loss',
        patience=3,
        restore_best_weights=True
    )

    # Label input ids and attention mask for BERT (from BERT tokenizer), for the sake of convienience
    train_input_ids = X_train_tokenized['input_ids']
    train_attention_mask = X_train_tokenized['attention_mask']
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

  # Import emobank dataset and tokenise variables
  X_train_tokenized, X_test_tokenized, y_train, y_test, tokenizer = prepare_data()

  # Create the BERT model
  learning_rate = 3e-5
  dropout_rate = 0.3
  freeze = 4
  model = create_model(learning_rate=learning_rate, dropout_rate=dropout_rate)

  # Train model
  model = train_model(model, epochs=50, batch_size=32)

  # Save model
  model.save("./models/Emotion Analysis - BERT.h5")
  with open("./models/Emotion Analysis - BERT.pkl", "wb") as f:
    pickle.dump(tokenizer, f)

def predict_emotion(new_text):
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  model_path = os.path.join(curr_dir, "models", "Emotion Analysis - BERT.h5")
  tokenizer_path = os.path.join(curr_dir, "models", "Emotion Analysis - BERT.pkl")

  with custom_object_scope({"TFBertModel": TFBertModel, "weighted_mse": weighted_mse}):
    model = tf.keras.models.load_model(model_path)
  with open(tokenizer_path, "rb") as f:
      tokenizer = pickle.load(f)

  new_text_tokenized = tokenizer(
      new_text, 
      padding="max_length", 
      truncation=True,
      max_length=50,
      return_tensors='tf'
  )
  
  # Make a prediction for the new text provided
  predictions = model.predict([new_text_tokenized['input_ids'], new_text_tokenized['attention_mask']])
  
  # Convert from numpy 32 to regular float
  predicted_emotions = {
     "valence": round(float(predictions[0][0]), 2),
     "arousal": round(float(predictions[0][1]), 2),
     "dominance": round(float(predictions[0][2]), 2)
  }

  return predicted_emotions