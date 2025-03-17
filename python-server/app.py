import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3"

import re
import string

from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import numpy as np
import pandas as pd
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
from text_metrics import calculate_metrics
from generate_report import fetch_author_report

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
  
  text_wordcloud, text_metrics = calculate_metrics(user_text)
  response["wordcloud"] = text_wordcloud
  response["metrics"] = text_metrics

  return jsonify(response)

@app.route('/read_author_report', methods=['POST'])
def serve_author_report():
  request_data = request.get_json()
  author = request_data.get("author")
  author_report = fetch_author_report(author)

  return jsonify(author_report)

if __name__ == '__main__':
    app.run(port=5001, debug=True)