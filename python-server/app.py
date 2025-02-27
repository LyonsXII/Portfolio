from flask import Flask, request, jsonify
from flask_cors import CORS

import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflow_hub as hub

from BERT import predict

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict_author():
    # Get JSON data from the request
    data = request.get_json()

    # Predict author of text
    prediction_data = predict(data["text"])

    # Example response
    response = prediction_data

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)