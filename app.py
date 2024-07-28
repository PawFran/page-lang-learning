from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/start_translation_session', methods=['POST'])
def start_translation_session():
    data = request.get_json()
    start = data['start']
    end = data['end']
    response_text = f"Lorem ipsum"
    print(response_text)
    return jsonify({'response': response_text})


@app.route('/finish_translation_session', methods=['POST'])
def finish_translation_session():
    response_text = f"Session finished"
    return jsonify({'response': response_text})


@app.route('/translation', methods=['POST'])
def check_translation():
    data = request.get_json()
    word = data['word']
    translation = data['translation']
    response_text = f"System will check if {translation} is correct translation for {word}"
    return jsonify({'response': response_text})


@app.route('/start_declension_session', methods=['POST'])
def start_declension_session():
    data = request.get_json()  # Get the JSON data sent by the client
    declensions = data['declensions']
    print("Received declensions:", declensions)  # Log the declensions to the console

    # Send back a confirmation response
    return jsonify({'status': 'success', 'received': declensions})


@app.route('/finish_declension_session', methods=['POST'])
def finish_declension_session():
    response_text = f"Session finished"
    return jsonify({'response': response_text})


@app.route('/declension_answer', methods=['POST'])
def check_declension_answer():
    data = request.get_json()
    word = data['word']
    answer = data['answer']
    response_text = f"System will check if {answer} is correct"
    return jsonify({'response': response_text})


@app.route('/start_conjugation_session', methods=['POST'])
def start_conjugation_session():
    data = request.get_json()  # Get the JSON data sent by the client
    conjugations = data['conjugations']
    moods = data['moods']
    voices = data['voices']
    tenses = data['tenses']

    # Send back a confirmation response
    return jsonify({'status': 'success', 'received': conjugations})


@app.route('/finish_conjugation_session', methods=['POST'])
def finish_conjugation_session():
    response_text = f"Session finished"
    return jsonify({'response': response_text})


@app.route('/conjugation_answer', methods=['POST'])
def check_conjugation_answer():
    data = request.get_json()
    word = data['word']
    answer = data['answer']
    response_text = f"System will check if {answer} is correct"
    return jsonify({'response': response_text})


@app.route('/scrape', methods=['POST'])
def scrape():
    data = request.get_json()
    words = data['words']
    response_text = f"Following words will be scraped: {words}"
    print(response_text)
    return jsonify({'response': response_text})


if __name__ == '__main__':
    app.run(debug=True)
