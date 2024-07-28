from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json()
    start = data['start']
    end = data['end']
    response_text = f"Lorem ipsum"
    print(response_text)
    # console_type = data['type']  # '1', '2', or '3' corresponding to Translation, Verb, Noun
    return jsonify({'response': response_text})


@app.route('/finish', methods=['POST'])
def finish_session():
    response_text = f"Session finished"
    return jsonify({'response': response_text})


@app.route('/translation', methods=['POST'])
def check_translation():
    data = request.get_json()
    word = data['word']
    translation = data['translation']
    response_text = f"System will check if {translation} is correct translation for {word}"
    return jsonify({'response': response_text})


if __name__ == '__main__':
    app.run(debug=True)
