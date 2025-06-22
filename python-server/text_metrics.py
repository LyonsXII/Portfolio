import os

import re
import string

import nltk
from nltk.corpus import stopwords
from nltk.corpus import cmudict
from nltk.stem.porter import PorterStemmer
import spacy
from collections import Counter
import matplotlib.pyplot as plt
from wordcloud import WordCloud

def generate_word_cloud(text, author):
  # Create stopwords object and extend as needed
  # Add more words to update if seeing any frequently missed by stopwords, e.g. "said"
  stop_words = set(stopwords.words('english'))
  extra_stopwords = {"said", "Said"}
  stop_words.update(extra_stopwords)

  # Process text
  text = re.sub(r'\n', " ", text)  # Newlines
  text = re.sub(r'\s+', ' ', text).strip()  # Extra spaces
  text = re.sub(r"[^\w\s’]+", "", text) # All quotation except apostrophes
  text = text.split()

  processed_text = [word.strip(string.punctuation) for word in text if word.lower().strip(string.punctuation) not in stop_words and len(word) > 1]
  processed_text = " ".join(processed_text)

  # Generate and plot word cloud
  wordcloud = WordCloud(width=800, height=400, background_color='white').generate(processed_text)

  plt.figure(figsize=(10, 5))
  plt.imshow(wordcloud, interpolation="bilinear")
  plt.axis("off")

  # Save plot
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  wordcloud_path = os.path.join(curr_dir, f"public/author reports/{author} - Wordcloud.jpg")
  plt.savefig(wordcloud_path)
  plt.close()

def metrics(text):
  nltk.download("cmudict", quiet=True)
  cmu_dict = cmudict.dict()

  def count(text):
    text = text.split()
    end_of_sentence = [".", "?", "!", "‽"]

    total_letters = 0
    total_words = 0
    total_sentences = 0
    for word in text:
        total_words += 1
        total_letters += len(word)
        if word[-1] in end_of_sentence or len(word) > 1 and word[-2] in end_of_sentence:
            total_sentences += 1
    return [total_letters, total_words, total_sentences]

  def count_syllables(word):
      # Return from cmudict if available
      if word in cmu_dict:
          return min(len([y for y in pron if y[-1].isdigit()]) for pron in cmu_dict[word])

      # Rule-based fallback
      vowels = "aeiouy"
      syllable_count = 0
      prev_was_vowel = False

      for char in word:
          if char in vowels:
              if not prev_was_vowel:
                  syllable_count += 1
              prev_was_vowel = True
          else:
              prev_was_vowel = False

      # Fix silent "e" and overcounting
      if word.endswith("e") and syllable_count > 1:
          syllable_count -= 1
      if word.endswith(("ed", "es")) and syllable_count > 1:
          syllable_count -= 1

      return max(syllable_count, 1)  # Ensure at least 1 syllable

  def determine_tense_and_person(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)

    tenses = {"past": 0, "present": 0, "future": 0}
    persons = {"first": 0, "second": 0, "third": 0}

    for token in doc:
        # Determine tense (using verbs)
        if token.pos_ == "VERB":
            if token.tag_ == "VBD" or token.tag_ == "VBN":
                tenses["past"] += 1
            elif token.tag_ == "VBG" or token.tag_ == "VBZ" or token.tag_ == "VBP":
                tenses["present"] += 1
            elif token.tag_ == "MD":
                tenses["future"] += 1

        # Determine person (using pronouns)
        if token.pos_ == "PRON":
            if token.text.lower() in ["i", "we"]:
                persons["first"] += 1
            elif token.text.lower() == "you":
                persons["second"] += 1
            elif token.text.lower() in ["he", "she", "it", "they"]:
                persons["third"] += 1

        # Determine the most frequent tense and person
        most_frequent_tense = max(tenses, key=tenses.get)
        most_frequent_person = max(persons, key=persons.get)

        return [most_frequent_tense, most_frequent_person]

  def determine_voice(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    sentences = list(doc.sents)
    passive_sentences = 0

    for sent in sentences:
        if any(token.dep_ == "nsubjpass" for token in sent):
            passive_sentences += 1

    # Calculating frequency of passive sentences
    freq = passive_sentences / len(sentences) if sentences else 0
    voice = "active" if freq >= 0.5 else "passive"
    return voice

  def word_type_breakdown(text):
    nlp = spacy.load("en_core_web_sm")
    doc = nlp(text)
    
    # Count POS tags
    word_type_counts = Counter(token.pos_ for token in doc)
    
    # Convert spaCy POS tags to readable labels
    word_type_labels = { "NOUN": "Nouns", "VERB": "Verbs", "ADJ": "Adjectives", 
                    "ADV": "Adverbs" }
    
    # Map POS tags to human-readable labels and filter relevant ones
    filtered_counts = {word_type_labels.get(pos, pos): count for pos, count in word_type_counts.items() if pos in word_type_labels}

    return filtered_counts

  text = text.lower()
  # Count words and sentences
  total_letters, total_words, total_sentences = count(text)

  # Preprocess text
  text = re.sub(r"[^\w\s’]+", "", text)
  text = text.split()

  # Count syllables
  total_syllables = 0
  for word in text:
      total_syllables += count_syllables(word)

  # Calculate Flesch-Kincaid Reading Ease
  def fk_map(fk_score):
      if fk_score < 10:
          return "Professional"
      elif fk_score < 30:
          return "College Graduate"
      elif fk_score < 50:
          return "College"
      elif fk_score < 60:
          return "Year 11 to 13"
      elif fk_score < 70:
          return "Year 9 to 10"
      elif fk_score < 80:
          return "Year 8"
      elif fk_score < 90:
          return "Year 7"
      else:
          return "Year 6"
  if total_words and total_syllables and total_sentences:
    fk_score = 206.835 - (1.015 * (total_words / total_sentences)) - (84.6 * (total_syllables / total_words))
  else:
    fk_score = 0
  fk_grade = fk_map(fk_score)

  # Additional metrics
  if total_words and total_syllables and total_sentences:
    average_word_length = total_letters / total_words
    average_sentence_length = total_words / total_sentences
    unique_word_count = len(set(text))
    lexical_diversity = (unique_word_count / total_words) * 100
  else:
    average_word_length = 0
    average_sentence_length = 0
    lexical_diversity = 0

  # Tense, person, and voice
  text = " ".join(text)
  tense, person = determine_tense_and_person(text)
  voice = determine_voice(text)

  # Word type breakdown (e.g. noun, verb, etc)
  word_types = word_type_breakdown(text)

  # Return calculated metrics
  metrics = {
      "total_words": total_words,
      "total_sentences": total_sentences,
      "total_syllables": total_syllables,
      "fk_score": round(fk_score, 2),
      "fk_grade": fk_grade,
      "average_word_length": round(average_word_length, 2),
      "average_sentence_length": round(average_sentence_length, 2),
      "lexical_diversity": round(lexical_diversity, 2),
      "tense": tense,
      "person": person,
      "voice": voice,
      "word_types": word_types
  }

  return metrics

def calculate_metrics(text, author):
  generate_word_cloud(text, author)
  text_metrics = metrics(text)

  return text_metrics
