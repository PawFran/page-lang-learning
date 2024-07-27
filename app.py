from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')


@app.route('/start', methods=['POST'])
def start_session():
    data = request.get_json()
    start_word = data.get('startWord')
    end_word = data.get('endWord')
    # Process these words as needed, perhaps logging them or initiating a session
    response_text = f"Received start: {start_word} and end: {end_word}"
    print(response_text)
    return jsonify({'response': response_text})
   

@app.route('/process', methods=['POST'])
def process_text():
    data = request.get_json()
    user_text = data['text']
    response_text = f"Server received: {user_text}"
    print(user_text)
    # console_type = data['type']  # '1', '2', or '3' corresponding to Translation, Verb, Noun
    return jsonify({'response': response_text})

if __name__ == '__main__':
    app.run(debug=True)
