from flask import Flask, request, jsonify
import torch
from model import load_model, plot_image
from config import MODEL_PATH
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

if torch.cuda.is_available:
    print("CUDA is available. Running on GPU")
else:
    print("CUDA is unavailable. Running on CPU")

# model = load_model(model_path=MODEL_PATH)

# @app.route('/predict', methods=["POST"])
# def predict():
#     if request.method == "POST":
#         data = request.get_json()
#         inputs = data['inputs']

#         input_tensor = torch.tensor(inputs)

#         with torch.no_grad():
#             output = model(input_tensor)

#             response = output.numpy().tolist()

#         return jsonify(response)
    
@app.route("/")
def index():
    return "hello, people"

@app.route('/add', methods=["POST"])
def add():
    data = request.json
    input_data = data['inputs']
    print(input_data)
    calc = input_data**2
    return jsonify(calc)

if __name__ == "__main__":
    app.run(debug=True)