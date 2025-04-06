import numpy as np
import pandas as pd
import os
import re
import nltk
from nltk.corpus import stopwords
import spacy
import gensim
from gensim.corpora import Dictionary
from gensim.models import LdaModel
from gensim.utils import simple_preprocess
import pyLDAvis
import pyLDAvis.gensim as gensimvis

def prepare_text(texts):
  # Load nlp from spacy, only load tagger
  nlp = spacy.load('en_core_web_sm', disable=['parser', 'ner'])

  # Import stopwords from nltk
  stop_words = nltk.corpus.stopwords.words('english')

  # Convert text into a list of tokens using simple_preprocess from gensim
  # Convers to lowercase, eliminates punctuation, and splits text into individual words
  # Deacc True also removes accent marks, min_len determines the minimum length of tokens to include
  processed_text = [[word for word in simple_preprocess(str(text), deacc=True, min_len=3) if word not in stop_words] for text in texts]

  # Build bigrams and trigrams for text
  bigram = gensim.models.Phrases(texts, min_count=20, threshold=100)
  trigram = gensim.models.Phrases(bigram[texts], threshold=100)
  bigram_mod = gensim.models.phrases.Phraser(bigram)
  trigram_mod = gensim.models.phrases.Phraser(trigram)

  # Implement bigrams and trigrams (captures paired double and triple words e.g. dragon reborn)
  processed_text = [bigram_mod[text] for text in processed_text]
  processed_text = [trigram_mod[bigram_mod[text]] for text in processed_text]

  # Finally apply lemmatization (e.g. run, running to just run) and part of speech filtering
  output_text = []
  allowed_tags = ['NOUN', 'ADJ', 'VERB', 'ADV']
  for text in processed_text:
    doc = nlp(" ".join(text)) 
    output_text.append([token.lemma_ for token in doc if token.pos_ in allowed_tags])

  # Make sure any stopwords and short tokens removed (as lemmatization changes words e.g. running to run)
  output_text = [[word for word in simple_preprocess(str(entry), deacc=True, min_len=3) if word not in stop_words] for entry in output_text]

  return output_text

# Expects a list of strings, can pass in multiple authors as separate strings
def generateTopicAnalysis(texts, author, num_topics):
  def create_model(gensim_text, num_topics):
    # Prepare model arguments
    id2word = Dictionary(gensim_text)
    corpus = [id2word.doc2bow(chapter) for chapter in gensim_text]

    # Create model
    num_topics = num_topics
    mallet_path = "./public/mallet-2.0.8/bin/mallet"
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

  # Prepare text for model
  processed_text = prepare_text(texts)

  # Import dataset and create model
  id2word, corpus, ldamallet = create_model(processed_text, num_topics)

  # Convert mallet model into regular LDA
  optimal_model = convertldaGenToldaMallet(ldamallet)

  # Generate visualization
  vis = gensimvis.prepare(optimal_model, corpus, id2word)

  # Save as an HTML file
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  topicAnalysis_path = os.path.join(curr_dir, f"public/author reports/{author} - Topic Analysis.html")
  pyLDAvis.save_html(vis, topicAnalysis_path)

def generateTopicAnalysisReports(num_topics):
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

  # Import Dataset
  dataset = import_dataset()

  # Merge together text for rows with the same title and author
  dataset = dataset.groupby(['title', 'author'])['text'].apply(' '.join).reset_index()
 
  # Produce a topic analysis for each author
  for index, row in dataset.iterrows():
    generateTopicAnalysis([row["text"]], row["author"], num_topics)

  # Produce a topic analysis using all text data
  full_text = list(dataset["text"])
  generateTopicAnalysis(full_text, "All Data", num_topics)

# References
# https://medium.com/@kurtsenol21/topic-modeling-lda-mallet-implementation-in-python-part-1-c493a5297ad2
# https://neptune.ai/blog/pyldavis-topic-modelling-exploration-tool-that-every-nlp-data-scientist-should-know