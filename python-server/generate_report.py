import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3"

import re

import numpy as np
import pandas as pd
import json

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
                  'author': author,
                  'title': book,
                  'text': text
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

  # Merge together text for rows with the same title and author
  dataset = dataset.groupby(['title', 'author'])['text'].apply(' '.join).reset_index()

  # Create new metrics dataframe (average word length, etc), and then concatenate it onto our original
  # Apply calculate_metrics to using text and author columns
  dataset["metrics"] = dataset.apply(lambda row: calculate_metrics(row["text"], row["author"]), axis=1)

  # Create new column including emotional analysis results
  dataset["predicted_emotions"] = dataset["text"].apply(predict_emotion)

  # Drop the text column as no longer needed
  dataset = dataset.drop(columns=["text"])

  # Save as series of JSON files, one per author
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  output_dir = os.path.join(curr_dir, "./public/author reports")
  os.makedirs(output_dir, exist_ok=True)

  for index, row in dataset.iterrows():
    author_json = row.to_json()
    output_path = os.path.join(output_dir, f"{row['author']}.json")
    with open(output_path, "w") as f:
      f.write(author_json)

  # Save metrics for plots
  plot_metrics_output_path = os.path.join(output_dir, "Plot Metrics.json")
  plot_metrics_object = {
    "authors": [],
    "fk_score": [],
    "lexical_diversity": []
  }

  for index, row in dataset.iterrows():
    plot_metrics_object["authors"].append(row["author"])
    plot_metrics_object["fk_score"].append(row["metrics"]["fk_score"])
    plot_metrics_object["lexical_diversity"].append(row["metrics"]["lexical_diversity"])

  with open(plot_metrics_output_path, "w") as f:
    json.dump(plot_metrics_object, f, indent=4)

  # Save dataframe as a JSON
  dataframe_output_path = os.path.join(output_dir, "Overall Report.json")
  dataset.to_json(dataframe_output_path, orient="records", indent=4)

# generate_report()