import torch
from neuralop.models import FNO
from scipy.io import loadmat
import numpy as np
import matplotlib.pyplot as plt
import os
import imageio
import datetime
from tqdm import tqdm
import shutil

def load_model(model_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(device)
    model = FNO(n_modes=(16, 16), hidden_channels=32, in_channels=1, out_channels=1).to(device)

    model.load_state_dict(torch.load(model_path))
    model.eval()

    return model

def plot_image(x, index, message):
    # plt.title(f"Time={sample1 * 5}")

    vmin = 0  # Minimum temperature value
    vmax = 80  # Maximum temperature value

    heatmap = plt.imshow(x, cmap='inferno', interpolation='nearest')
    plt.colorbar(label='Temperature (°C)')
    heatmap.set_clim(vmin, vmax)  # Set the colorbar scale explicitly
    plt.axis(False)
    plt.title(f"{message} at time={index * 5}")
    plt.show()

def makeAndSaveImage(sample, index):
    vmin = 0  # Minimum temperature value
    vmax = 80  # Maximum temperature value

    heatmap = plt.imshow(sample, cmap='inferno', interpolation='nearest')
    plt.colorbar(label='Temperature (°C)')
    heatmap.set_clim(vmin, vmax)  # Set the colorbar scale explicitly
    plt.axis(False)
    plt.savefig(f'static/temp_pictures/plot_{index}.png') # Save each plot
    plt.close()
    
def makeVideo(samples):

    image_num = len(samples)

    for i in range(image_num):
        makeAndSaveImage(samples[i].squeeze().squeeze(), i)

    images = []
    for time_point in tqdm(range(len(samples))):
        images.append(imageio.imread(f'static/temp_pictures/plot_{time_point}.png'))

    file_name = filenameMaker()
    imageio.mimsave(f'static/simulation_videos/{file_name}.mp4', images, fps=10) # Save as MP4

    shutil.rmtree("static/temp_pictures")


def filenameMaker():
    x = datetime.datetime.now()
    return f"{x.strftime('%H')}_{x.strftime('%M')}_{x.strftime('%S')} - ({x.strftime('%d')}-{x.strftime('%m')}-{x.strftime('%y')})"