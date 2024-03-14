import numpy as np
from scipy.io import loadmat
from helper import plot_image

data = loadmat("dataset/CASE_k.mat")

del data["__header__"]
del data["__version__"]
del data["__globals__"]

sample = np.array(data["T_k1"][1])

plot_image(sample, 1, "Truth")

print(sample.shape)

file_path = "input_samples/sample_k1.npy"

np.save(file_path, sample)