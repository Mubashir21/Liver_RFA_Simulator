import torch
from neuralop.models import FNO2d
from scipy.io import loadmat
import numpy as np
import matplotlib
import matplotlib.pyplot as plt 
import os
import imageio
import datetime
from tqdm import tqdm
import os
import tempfile
from pathlib import Path

matplotlib.use('Agg')  # Use the 'Agg' backend for file generation without display

# Function to load the PyTorch model
def load_model(model_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = FNO2d(
        n_modes_height=32, n_modes_width=32, hidden_channels=32,
        projection_channels=101, in_channels=4, out_channels=1
    ).to(device)

    state = torch.load(model_path, map_location=device)
    model.load_state_dict(state)
    model.eval()
    return model


# Function to plot an image using Matplotlib
def plot_image(x, index, message):
    # plt.title(f"Time={sample1 * 5}")

    vmin = 0  # Minimum temperature value
    vmax = 80  # Maximum temperature value

    heatmap = plt.imshow(x, cmap='inferno', interpolation='nearest')
    plt.colorbar(label='Temperature (°C)')
    heatmap.set_clim(vmin, vmax)  # Set the colorbar scale explicitly
    plt.axis(False)
    plt.title(f"{message} at time={index * 5}")

def makeAndSaveImage(sample, index, out_dir: Path):
    vmin, vmax = 0, 80
    plt.figure()
    heatmap = plt.imshow(sample, cmap='inferno', interpolation='nearest')
    plt.colorbar(label='Temperature (°C)')
    heatmap.set_clim(vmin, vmax)
    plt.axis(False)
    plt.title(f"Prediction at Time: {index * 5} seconds")
    plt.savefig(out_dir / f"plot_{index}.png", bbox_inches="tight")
    plt.close()

def makeVideo(samples) -> str:
    # Make a unique temp folder for frames so requests don’t clash
    with tempfile.TemporaryDirectory() as tmp:
        tmp_path = Path(tmp)

        for i in range(len(samples)):
            makeAndSaveImage(samples[i].squeeze(), i, tmp_path)

        frames = []
        for i in range(len(samples)):
            frames.append(imageio.imread(tmp_path / f"plot_{i}.png"))

        file_name = filenameMaker()
        out_path = Path("static/simulation_videos")
        out_path.mkdir(parents=True, exist_ok=True)

        video_file = out_path / f"{file_name}.mp4"
        imageio.mimsave(video_file, frames, fps=24)

    return file_name

# Function to generate a unique filename based on the current time
def filenameMaker():
    x = datetime.datetime.now()
    return x.strftime("%Y%m%d_%H%M%S")

# Function to normalize input parameters within a predefined range
def normalizeParams(k, w, sig):

    min_range = 5
    max_range = 150
    params_min_max = {"case_k":{"min":0.46, "max":0.54}, "case_w_sig":{"min":0.0045, "max":0.0085}}

    norm_k = round(((k - params_min_max['case_k']["min"]) / (params_min_max['case_k']["max"] - params_min_max['case_k']["min"])) * (max_range - min_range) + min_range)
    norm_w = round(((w - params_min_max['case_w_sig']["min"]) / (params_min_max['case_w_sig']["max"] - params_min_max['case_w_sig']["min"])) * (max_range - min_range) + min_range)
    norm_sig = round(((sig - params_min_max['case_w_sig']["min"]) / (params_min_max['case_w_sig']["max"] - params_min_max['case_w_sig']["min"])) * (max_range - min_range) + min_range)

    return [norm_k, norm_w, norm_sig]