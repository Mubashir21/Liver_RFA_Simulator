import torch
from neuralop.models import FNO
from scipy.io import loadmat
import numpy as np
import matplotlib.pyplot as plt

def load_model(model_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = FNO(n_modes=(16, 16), hidden_channels=32, in_channels=1, out_channels=1).to(device)

    checkpoint = torch.load(model_path)

    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()

    return model

def plot_image(x, index, message):
    # plt.title(f"Time={sample1 * 5}")

    vmin = 0  # Minimum temperature value
    vmax = 80  # Maximum temperature value

    heatmap = plt.imshow(x.squeeze().detach().cpu().numpy(), cmap='inferno', interpolation='nearest')
    plt.colorbar(label='Temperature (°C)')
    heatmap.set_clim(vmin, vmax)  # Set the colorbar scale explicitly
    plt.axis(False)
    plt.title(f"{message} at time={index * 5}")


