from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy
import re

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

def preprocess_instruction(instruction):
    # Convert to lowercase
    instruction = instruction.lower()
    # Remove punctuation
    instruction = re.sub(r'[^\w\s]', '', instruction)
    # Tokenize
    tokens = instruction.split()
    return tokens

@app.route('/process_instruction', methods=['POST'])
def process_instruction():
    data = request.json
    instruction = data['instruction']
    
    # Preprocess the instruction
    preprocessed = preprocess_instruction(instruction)
    
    # Use spaCy for NLP processing
    doc = nlp(instruction)
    action, target = extract_action_and_target(doc)
    
    # Determine the action based on keywords
    if 'open' in preprocessed or 'go to' in ' '.join(preprocessed):
        action = 'open'
    elif 'search' in preprocessed:
        action = 'search'
    elif 'copy' in preprocessed:
        action = 'copy'
    
    response = {
        'action': action,
        'target': target,
        'preprocessed': preprocessed,
        'full_instruction': instruction
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)