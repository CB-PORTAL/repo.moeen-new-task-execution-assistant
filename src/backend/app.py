from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)
nlp = spacy.load("en_core_web_sm")

def extract_action_and_target(doc):
    action = None
    target = None
    for token in doc:
        if token.pos_ == "VERB" and not action:
            action = token.lemma_
        if token.dep_ in ["dobj", "pobj"] and not target:
            target = token.text
    return action, target

@app.route('/process_instruction', methods=['POST'])
def process_instruction():
    data = request.json
    instruction = data['instruction']
    doc = nlp(instruction)
    action, target = extract_action_and_target(doc)
    
    response = {
        'action': action,
        'target': target,
        'full_instruction': instruction
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)