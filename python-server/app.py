from flask import Flask, request, jsonify

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
