import numpy as np
import pandas as pd
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import tensorflow as tf
import tensorflow_hub as hub

print(tf.__version__)

def import_dataset():
  import os

  current_dir = os.path.dirname(os.path.realpath('__file__'))
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

# Import Dataset
dataset = import_dataset()

# Preprocess text
fragment_size = 200
overlap = 50

def preprocess_text(text, ps, all_stopwords):
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

ps = PorterStemmer()
nltk.download('stopwords')
all_stopwords = stopwords.words('english')
all_stopwords.remove('not')

# Apply our cleaning and create a new dataset to replace our previous one, this time with processed text
text_fragments = []
for index, row in dataset.iterrows():
    text = row["Text"]
    text = preprocess_text(text, ps, all_stopwords)
    current_text_fragments = fragment_text(text, fragment_size, overlap)
    
    for text_fragment in current_text_fragments:
        text_fragments.append({
            "Book": row["Book"],
            "Author": row["Author"],
            "Text": text_fragment
        })

# Convert the data fragments into a Pandas DataFrame and replace the original
dataset = pd.DataFrame(text_fragments)
print(dataset.head())