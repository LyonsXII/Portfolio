import numpy as np
import pandas as pd
import os
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
from nltk.stem import WordNetLemmatizer
import spacy
import gensim
from gensim import corpora
from gensim.corpora import Dictionary
from gensim.models import LdaModel
import pyLDAvis
import pyLDAvis.gensim as gensimvis
import matplotlib.pyplot as plt

def prepare_text():
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
                    'Book': book,
                    'Chapter': chapter[:-4],
                    'Text': text
                })

    return pd.DataFrame(data)

  def preserve_names(text):
      chapter = nlp(text)
      processed_text = []

      for word in chapter:
          # Checking if proper noun using nlp
          if word.pos_ == "PROPN":  
              processed_text.append(word.text)
          else:
              processed_text.append(word.text.lower())

      return processed_text

  def clean_text(text, all_stopwords):
      if isinstance(text, str):
          # Clean text
          text = re.sub(r'\n', " ", text)  # Newlines
          text = re.sub(r'[^a-zA-Z\s]', " ", text)  # Punctuation and special characters
          text = re.sub(r'\s+', ' ', text).strip()  # Extra spaces
          words = preserve_names(text)
      else:
          words = text

      # Apply lemmatizer
      processed_text = [lemmatizer.lemmatize(word) for word in words if word not in all_stopwords]
      processed_text = " ".join(processed_text)
      
      return processed_text

  dataset = import_dataset()
 
  # Setup processing objects
  lemmatizer = WordNetLemmatizer()
  nlp = spacy.load("en_core_web_sm")
  nltk.download('wordnet', quiet = True)
  nltk.download('stopwords', quiet = True)
  all_stopwords = stopwords.words('english')
  all_stopwords.remove('not')

  # Apply our cleaning and create a new dataset to replace our previous one, this time with processed text
  processed_text = []
  for index, row in dataset.iterrows():
      text = row["Text"]
      processed_chapter = clean_text(text, all_stopwords)
      processed_text.append(processed_chapter)
      
  # Convert the data fragments into a Pandas DataFrame and replace the original
  dataset['Text'] = processed_text

  return dataset

def create_model(dataset):
  # Prepare model arguments
  gensim_text = [chapter.split() for chapter in dataset["Text"]]
  id2word = Dictionary(gensim_text)
  corpus = [id2word.doc2bow(chapter) for chapter in gensim_text]

  # Create model
  num_topics = 34
  mallet_path = "./notebooks/mallet-2.0.8/bin/mallet"
  ldamallet = gensim.models.wrappers.LdaMallet(
    mallet_path, 
    corpus=corpus, 
    num_topics=num_topics, 
    id2word=id2word
  )

  return id2word, corpus, ldamallet

def convertldaGenToldaMallet(mallet_model):
    model_gensim = LdaModel(
        id2word=mallet_model.id2word, num_topics=mallet_model.num_topics,
        alpha=mallet_model.alpha, eta=0,
    )
    model_gensim.state.sstats[...] = mallet_model.wordtopics
    model_gensim.sync_state()
    return model_gensim

# Import dataset and create model
dataset = prepare_text()
id2word, corpus, ldamallet = create_model(dataset)
# Convert mallet model into regular LDA
optimal_model = convertldaGenToldaMallet(ldamallet)

# Generate visualization
vis = gensimvis.prepare(optimal_model, corpus, id2word)

# Save as an HTML file
pyLDAvis.save_html(vis, "lda_vis.html")