import torch
from neuralop.models import FNO
from scipy.io import loadmat
import numpy as np
import matplotlib
import matplotlib.pyplot as plt 
import os
import imageio
import datetime
from tqdm import tqdm
import os

matplotlib.use('Agg')  # Use the 'Agg' backend for file generation without display

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
    plt.title(f"Truth at Time: {index * 5} seconds")
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
    imageio.mimsave(f'static/simulation_videos/{file_name}.mp4', images, fps=24) # Save as MP4

    delete_folder_contents("static/temp_pictures")
    
    return file_name

def filenameMaker():
    x = datetime.datetime.now()
    return f"{x.strftime('%H')}_{x.strftime('%M')}_{x.strftime('%S')} - ({x.strftime('%d')}-{x.strftime('%m')}-{x.strftime('%y')})"

def delete_folder_contents(folder_path):
    # Iterate over all the files and subdirectories in the given folder
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)
        # Check if the current item is a file
        if os.path.isfile(item_path):
            # If it's a file, delete it
            os.remove(item_path)
        # If it's a directory, recursively call the function to delete its contents
        elif os.path.isdir(item_path):
            delete_folder_contents(item_path)
            # After deleting the contents, remove the empty directory
            os.rmdir(item_path)

def saveModel(model):
    directory = "saved_models"

    # Specify the filename for your model
    filename = filenameMaker()

    # Full path for saving the model
    full_path = os.path.join(directory, filename)

    # Check if the specified directory exists, create it if it does not
    if not os.path.exists(directory):
        os.makedirs(directory)

    # saving the paramaters of the model, not the model itself
    torch.save(model.state_dict(), full_path)


def filenameMaker():
    x = datetime.datetime.now()
    return f"Model {x.strftime('%H')}_{x.strftime('%M')}_{x.strftime('%S')} - ({x.strftime('%d')}-{x.strftime('%m')}-{x.strftime('%y')})"

def makePredictions(model, timestamps, input):
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    simulation = []

    if input.dim() == 3:
        input = input.unsqueeze(0)

    # k_val = round(input[0][1][0][0].item(), 4)
    # w_val = round(input[0][2][0][0].item(), 4)
    # sig_val = round(input[0][3][0][0].item(), 4)
    k_val = 3
    w_val = 3
    sig_val = 3
    params_tensor = torch.tensor([[k_val, w_val, sig_val]]).view(1, 3, 1, 1).expand(-1, -1, 101, 101).to(device)
    input = torch.cat((input, params_tensor), dim=1)
    
    model.eval()
    with torch.inference_mode():
        for i in range(timestamps):
            prediction = model(input)
            simulation.append(prediction.squeeze().detach().cpu().numpy())
            input = torch.cat((prediction, params_tensor), dim=1)
    
    return np.array(simulation)
        