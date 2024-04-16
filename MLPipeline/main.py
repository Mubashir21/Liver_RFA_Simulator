import torch
from neuralop.models import FNO2d
from helper import makePredictions, makeVideo
from visualize import makeComparisonVideo
import numpy as np

device = ""
if torch.cuda.is_available():
    print("Running on GPU")
    print()
    device = "cuda"
else:
    print("Running on CPU")
    device = "cpu"

model = FNO2d(n_modes_height=32, n_modes_width=32, hidden_channels=32, projection_channels=101,
                in_channels=4, out_channels=1).to(device)

model.load_state_dict(torch.load("saved_models/FNO-5.pth"))

print("Model Loaded")
print()

try:    
    dataset_with_params = torch.load("dataset/normalized_with_input_parameters/case_k_params.pt").to(device)
    dataset_without_params = torch.load("dataset/normalized/case_k.pt").to(device)
    print("dataset gotchu")
    print()
except:
    print("cound not import")
    print()

sample = dataset_without_params[0][1]
sample = sample.unsqueeze(0)
predictions = makePredictions(model, 119, sample)
predictions = predictions[:, np.newaxis]

truth = dataset_without_params[0][2:].to("cpu").numpy()

makeComparisonVideo(truth, predictions, "Truth", "Predictions")