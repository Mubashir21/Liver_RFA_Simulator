from flask import Flask, request, jsonify, send_file
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
    k = float(request.form.get('k'))
    w = float(request.form.get('w'))
    sig = float(request.form.get('sig'))
    duration = int(request.form.get('duration'))
    print(k, w, sig, duration, type(k), type(w), type(sig), type(duration))


    if file and file.filename.endswith('.npy'):
        # Proceed with loading the .npy file
        array = np.load(file.stream)
        # Process the numpy array as needed

        input_tensor = torch.tensor(array).unsqueeze(0).unsqueeze(0).to(torch.float).to(device)
        prediction = input_tensor
        simulation = []
        k_val = 3
        w_val = 1
        sig_val = 1
        params_tensor = torch.tensor([[k, w, sig]]).view(1, 3, 1, 1).expand(-1, -1, 101, 101).to(device)
        input = torch.cat((prediction, params_tensor), dim=1)
        
        with torch.inference_mode():
            for i in tqdm(range(duration)):
                prediction = model(input)
                simulation.append(prediction.squeeze().detach().cpu().numpy())
                input = torch.cat((prediction, params_tensor), dim=1)
        # with torch.no_grad():
        #     for i in tqdm(range(40)):
        #         input = prediction
        #         prediction = model(input)
        #         simulation.append(prediction.cpu().numpy())
        
        file_name = makeVideo(simulation)

        return send_file(f"static/simulation_videos/{file_name}.mp4", mimetype='video/mp4')
    else:
        return 'Invalid file format', 400  # Return a 400 Bad Request response for non-.npy files
    
@app.route("/")
def index():
    return "hello, people"

if __name__ == "__main__":
    app.run(debug=True)