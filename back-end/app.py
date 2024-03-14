from flask import Flask, request, jsonify
import torch
from helper import load_model, plot_image, makeVideo
from config import MODEL_PATH
from flask_cors import CORS
import numpy as np
from tqdm import tqdm


app = Flask(__name__)
CORS(app)

if torch.cuda.is_available:
    print("CUDA is available. Running on GPU")
else:
    print("CUDA is unavailable. Running on CPU")

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = load_model(MODEL_PATH)

@app.route('/predict', methods=["POST"])
def predict():
    file = request.files['file']

    if file and file.filename.endswith('.npy'):
        # Proceed with loading the .npy file
        array = np.load(file.stream)
        # Process the numpy array as needed

        input_tensor = torch.tensor(array).unsqueeze(0).unsqueeze(0).to(torch.float).to(device)
        prediction = input_tensor
        simulation = []

        with torch.no_grad():
            print("hello")
            for i in tqdm(range(40)):
                input = prediction
                prediction = model(input)
                simulation.append(prediction.cpu().numpy())
        
        makeVideo(simulation)

        return 'File uploaded and processed successfully'
    else:
        return 'Invalid file format', 400  # Return a 400 Bad Request response for non-.npy files

        # input_tensor = torch.tensor(inputs)

        # with torch.no_grad():
        #     output = model(input_tensor)

        #     response = output.numpy().tolist()

        # return jsonify(array.shape)
    
@app.route("/")
def index():
    return "hello, people"

if __name__ == "__main__":
    app.run(debug=True)