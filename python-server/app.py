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
    generate_word_cloud(author, text)

  curr_dir = os.path.dirname(os.path.abspath(__file__))
  wordcloud_path = os.path.join(curr_dir, f"public/author reports/{author} - Wordcloud.jpg")
  if not os.path.exists(wordcloud_path):
      
      return jsonify({"error": "Image not found"}), 404

  return send_file(wordcloud_path, mimetype='image/jpeg')

if __name__ == '__main__':
    app.run(port=5001, debug=True)