import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = "3"

import re
import string

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
import nltk
from nltk.corpus import stopwords
import spacy
import gensim
from gensim.corpora import Dictionary
from gensim.models import LdaModel
from gensim.utils import simple_preprocess
import pyLDAvis
import pyLDAvis.gensim as gensimvis

from pyLDAvis_model import generateTopicAnalysis

app = Flask(__name__)
CORS(app)

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
    app.run(port=5002, debug=True)