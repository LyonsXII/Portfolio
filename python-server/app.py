from flask import Flask, request, jsonify

import numpy as np
import pandas as pd
import tensorflow as tf
import tensorflow_hub as hub

app = Flask(__name__)

@app.route('/test', methods=['POST'])

def test_route():
    # Get JSON data from the request
    data = request.get_json()

    # Example response
    response = {
        "message": "JSON received",
        "received_data": data
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
