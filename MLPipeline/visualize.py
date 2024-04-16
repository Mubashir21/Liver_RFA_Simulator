import matplotlib.pyplot as plt
import numpy as np
from tqdm import tqdm
import imageio
from helper import filenameMaker, delete_folder_contents

def makeComparisonVideo(truth, prediction, message_truth="Truth", message_prediction="Prediction"):

    samples = plot_truth_vs_prediction_sequence(truth, prediction, message_truth=message_truth, message_prediction=message_prediction)

    images = []
    for time_point in tqdm(range(samples)):
        images.append(imageio.imread(f'static/temp_pictures/comparison_{time_point}.png'))

    file_name = filenameMaker()
    imageio.mimsave(f'static/simulation_videos/{file_name}.mp4', images, fps=24) # Save as MP4

    delete_folder_contents("static/temp_pictures")
    
    return file_name

def plot_truth_vs_prediction_sequence(truth, prediction, message_truth="Truth", message_prediction="Prediction"):
    """
    Generates side-by-side comparison plots for sequences of truth and prediction data.
    
    :param truth: 3D array of shape (timesteps, height, width) representing the truth data over time
    :param prediction: 3D array of shape (timesteps, height, width) representing the prediction data over time
    :param message_truth: Description or title for the truth data
    :param message_prediction: Description or title for the prediction data
    """
    assert truth.shape == prediction.shape, "Truth and prediction data must have the same shape"
    
    timesteps = len(truth)
    vmin = 0  # Minimum temperature value
    vmax = 80  # Maximum temperature value
    
    for index in range(timesteps):
        fig, axs = plt.subplots(nrows=1, ncols=2, figsize=(12, 6))
        
        # Plot truth data on the left
        heatmap1 = axs[0].imshow(truth[index].squeeze(), cmap='inferno', interpolation='nearest')
        fig.colorbar(heatmap1, ax=axs[0], label='Temperature (°C)')
        heatmap1.set_clim(vmin, vmax)
        axs[0].axis('off')
        axs[0].set_title(f"{message_truth} at time={index * 5}", fontsize=20)
        
        # Plot prediction data on the right
        heatmap2 = axs[1].imshow(prediction[index].squeeze(), cmap='inferno', interpolation='nearest')
        fig.colorbar(heatmap2, ax=axs[1], label='Temperature (°C)')
        heatmap2.set_clim(vmin, vmax)
        axs[1].axis('off')
        axs[1].set_title(f"{message_prediction} at time={index * 5}", fontsize=20)
        
        plt.tight_layout()
        plt.savefig(f'static/temp_pictures/comparison_{index}.png')  # Save each plot
        plt.close(fig)

    return timesteps