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
if torch.cuda.is_available():
    print("CUDA is available. Running on GPU")
else:
    print("CUDA is unavailable. Running on CPU")
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the pre-trained model
model = load_model(MODEL_PATH)

# Route for prediction endpoint
@app.route('/predict', methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify(error="Missing file field"), 400

    file = request.files["file"]

    try:
        k = float(request.form["k"])
        w = float(request.form["w"])
        sig = float(request.form["sig"])
        duration = int(request.form["duration"])
    except KeyError as e:
        return jsonify(error=f"Missing parameter: {e.args[0]}"), 400
    except ValueError:
        return jsonify(error="Invalid parameter type"), 400

    if duration < 1 or duration > 500:
        return jsonify(error="duration must be between 1 and 500"), 400

    k, w, sig = normalizeParams(k, w, sig)

    if not file.filename.endswith(".npy"):
        return jsonify(error="Invalid file format. Must be .npy"), 400

    array = np.load(file.stream)
    input_tensor = torch.tensor(array).unsqueeze(0).unsqueeze(0).float().to(device)

    simulation = []
    params_tensor = torch.tensor([[k, w, sig]]).view(1, 3, 1, 1).expand(-1, -1, 101, 101).to(device)

    x = torch.cat((input_tensor, params_tensor), dim=1)

    with torch.inference_mode():
        for _ in range(duration):
            pred = model(x)
            simulation.append(pred.squeeze().detach().cpu().numpy())
            x = torch.cat((pred, params_tensor), dim=1)

    file_name = makeVideo(simulation)
    return send_file(f"static/simulation_videos/{file_name}.mp4", mimetype="video/mp4")


# Route for home page
@app.route("/")
def index():
    return "hello, people"

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
