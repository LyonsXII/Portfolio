import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3"

import re
import string

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
import json
import nltk
from nltk.corpus import stopwords
from nltk.corpus import cmudict
from nltk.stem.porter import PorterStemmer
import spacy
import tensorflow as tf
import tensorflow_hub as hub
from wordcloud import WordCloud
import matplotlib.pyplot as plt

from author_predict import predict_author
from emotion_predict import predict_emotion
from text_metrics import generate_word_cloud, calculate_metrics

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def text_analysis():
  request_data = request.get_json()

  if not request_data or "text" not in request_data:
     return jsonify({"error": "No valid text input received"}, 400)

  response = {}
  user_text = request_data.get("text")
  response["predicted_authors"] = predict_author(user_text)
  response["predicted_emotions"] = predict_emotion(user_text)
  
  text_metrics = calculate_metrics(user_text, "Custom")
  response["metrics"] = text_metrics

  return jsonify(response)

@app.route('/list_authors', methods=['GET'])
def list_authors():
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  author_path = os.path.join(curr_dir, f"public/books")

  authors = []
  for author in os.listdir(author_path):
   authors.append(author)

  return jsonify(authors)

@app.route('/author_details', methods=['GET'])
def fetch_author_details():
  curr_dir = os.path.dirname(os.path.abspath(__file__))
  author_overall_path = os.path.join(curr_dir, f"public/author reports/Plot Metrics.json")

  with open(author_overall_path, "r") as f:
    author_details = json.load(f)

  return jsonify(author_details)

@app.route('/author_report', methods=['POST'])
def serve_author_report():
  request_data = request.get_json()
  author = request_data.get("author")

  if not author:
     return jsonify({"error": "No author provided"}), 400

  curr_dir = os.path.dirname(os.path.abspath(__file__))
  author_report_path = os.path.join(curr_dir, f"public/author reports/{author}.json")
  with open(author_report_path, "r") as f:
    author_report = json.load(f)

  return jsonify(author_report)

@app.route('/wordcloud', methods=['POST'])
def serve_wordcloud():
  request_data = request.get_json()
  author = request_data.get("author")
  text = request_data.get("text")

  if not author:
    return jsonify({"error": "No author provided"}), 400
  
  elif author == "Custom":
    generate_word_cloud(text, author)

  curr_dir = os.path.dirname(os.path.abspath(__file__))
  wordcloud_path = os.path.join(curr_dir, f"public/author reports/{author} - Wordcloud.jpg")
  if not os.path.exists(wordcloud_path):
      return jsonify({"error": "Image not found"}), 404

  return send_file(wordcloud_path, mimetype='image/jpeg')

@app.route('/topic_analysis', methods=['POST'])
def serve_topic_analysis():
  request_data = request.get_json()
  author = request_data.get("author")
  text = request_data.get("text")

  if not author:
    return jsonify({"error": "No author provided"}), 400
  
  elif author == "Custom":
    generateTopicAnalysis([text], author, 12)

  curr_dir = os.path.dirname(os.path.abspath(__file__))
  topic_analysis_path = os.path.join(curr_dir, f"public/author reports/{author} - Topic Analysis.html")

  if not os.path.exists(topic_analysis_path):
      return jsonify({"error": "Topic analysis not found"}), 404

  return send_file(topic_analysis_path, mimetype='text/html')
  
if __name__ == '__main__':
    app.run(port=5001, debug=True)