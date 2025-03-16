import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3"

import re

import numpy as np
import pandas as pd
import pickle

from emotion_predict import predict_emotion
from text_metrics import calculate_metrics

def generate_report():
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

  # Import Dataset
  dataset = import_dataset()

  # Clean text
  dataset["Text"] = dataset["Text"].apply(lambda text: clean_text(text))
  dataset = dataset.groupby(['Title', 'Author'])['Text'].apply(' '.join).reset_index()

  # Create new metrics dataframe (average word length, etc), and then concatenate it onto our original
  # Apply calculate_metrics to get both outputs (image and metrics object)
  dataset[["Wordcloud", "Metrics"]] = dataset["Text"].apply(lambda text: pd.Series(calculate_metrics(text)))
  dataset['Wordcloud'] = dataset['Wordcloud'].astype(str)

  # # Now split the 'Metrics' object into individual columns
  metrics_dataset = dataset["Metrics"].apply(pd.Series)

  # # Join the metrics DataFrame back to the original dataset
  dataset = pd.concat([dataset, metrics_dataset], axis=1)

  # Drop the original 'Metrics' column if you don't need it
  dataset = dataset.drop(columns=["Text", "Metrics"])
  dataset.to_pickle('data.pkl')

  curr_dir = os.path.dirname(os.path.abspath(__file__))
  output_path = os.path.join(curr_dir, "models", "Dataset Report.pkl")
  with open(output_path, 'wb') as file:
    pickle.dump(dataset, file)

def check_report():
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  output_path = os.path.join(curr_dir, "models", "Dataset Report.pkl")
  with open(output_path, "rb") as f:
    dataset = pickle.load(f)
  print(dataset.head)
  print(dataset.shape)
  print(dataset.columns)

def fetch_author_report(author):
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  output_path = os.path.join(curr_dir, "models", "Dataset Report.pkl")
  with open(output_path, "rb") as f:
    dataset = pickle.load(f)
  
  filtered_dataset = dataset[dataset["Author"] == author]
  json_dataset = filtered_dataset.to_json(orient="records")

  return json_dataset


