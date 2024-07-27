from flask import Flask, request, jsonify
import spacy

app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")

@app.route('/process_instruction', methods=['POST'])
def process_instruction():
    data = request.json
    instruction = data['instruction']
    
    # Process the instruction using spaCy
    doc = nlp(instruction)
    
    # This is a placeholder for more complex NLP logic
    processed_instruction = {
        'action': doc[0].text if doc[0].pos_ == 'VERB' else 'Unknown action',
        'object': ' '.join([token.text for token in doc if token.dep_ in ('dobj', 'pobj')])
    }
    
    return jsonify({'processed_instruction': processed_instruction})

if __name__ == '__main__':
    app.run(debug=True)