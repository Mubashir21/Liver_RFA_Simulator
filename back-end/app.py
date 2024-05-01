from flask import Flask, request, jsonify, send_file
import torch
from helper import load_model, plot_image, makeVideo, normalizeParams
from config import MODEL_PATH
from flask_cors import CORS
import numpy as np
from tqdm import tqdm

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow Cross-Origin Resource Sharing (CORS)

# Check if CUDA (GPU) is available, set device accordingly
if torch.cuda.is_available:
    print("CUDA is available. Running on GPU")
else:
    print("CUDA is unavailable. Running on CPU")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the pre-trained model
model = load_model(MODEL_PATH)

# Route for prediction endpoint
@app.route('/predict', methods=["POST"])
def predict():
    # Get file and parameters from request
    file = request.files['file']
    k = float(request.form.get('k'))
    w = float(request.form.get('w'))
    sig = float(request.form.get('sig'))
    duration = int(request.form.get('duration'))
    k, w, sig = normalizeParams(k, w, sig)  # Normalize parameters

    if file and file.filename.endswith('.npy'):
        # Proceed if the uploaded file is in .npy format
        array = np.load(file.stream)  # Load the numpy array
        input_tensor = torch.tensor(array).unsqueeze(0).unsqueeze(0).to(torch.float).to(device)
        prediction = input_tensor
        simulation = []
        params_tensor = torch.tensor([[k, w, sig]]).view(1, 3, 1, 1).expand(-1, -1, 101, 101).to(device)
        input = torch.cat((prediction, params_tensor), dim=1)

        # Run the simulation
        with torch.inference_mode():
            for i in tqdm(range(duration)):
                prediction = model(input)
                simulation.append(prediction.squeeze().detach().cpu().numpy())
                input = torch.cat((prediction, params_tensor), dim=1)

        # Generate video from simulation frames
        file_name = makeVideo(simulation)
        # Return the generated video file
        return send_file(f"static/simulation_videos/{file_name}.mp4", mimetype='video/mp4')
    else:
        # Return an error response for invalid file format
        return 'Invalid file format', 400  

# Route for home page
@app.route("/")
def index():
    return "hello, people"

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
