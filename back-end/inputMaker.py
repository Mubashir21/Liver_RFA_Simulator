import numpy as np
from scipy.io import loadmat
from helper import plot_image

# Load temperature data from MATLAB .mat file
data = loadmat("dataset/CASE_k.mat")

# Delete unnecessary metadata keys
del data["__header__"]
del data["__version__"]
del data["__globals__"]

# Extract temperature data for a specific sample (k1)
sample = np.array(data["T_k1"][1])

# Plot the temperature heatmap for the initial liver heatmap
plot_image(sample, 1, "Initial Liver Heatmap")

# Print the shape of the temperature data array
print(sample.shape)

# Define the file path to save the sample data as a .npy file
file_path = "input_samples/sample_k1.npy"

# Save the initial liver heatmap data as a .npy file
np.save(file_path, sample)
