from scipy.io import loadmat
import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from torch import nn
import numpy as np
from neuralop.models import FNO
import matplotlib.pyplot as plt
from neuralop import LpLoss, H1Loss

## import data into python
try:
    case_k = loadmat("dataset/raw/CASE_k.mat")
    case_w = loadmat("dataset/raw/CASE_w.mat")
    case_sig = loadmat("dataset/raw/CASE_sig.mat")
except:
    print("An exception occured when importing the dataset.\n")
else:
    print("Data imported successfully.\n")

# delete unwanted key value pairs
del case_k["__header__"]
del case_k["__version__"]
del case_k["__globals__"]
del case_w["__header__"]
del case_w["__version__"]
del case_w["__globals__"]
del case_sig["__header__"]
del case_sig["__version__"]
del case_sig["__globals__"]

case_k_np = np.stack((case_k['T_k1'], case_k['T_k2'], case_k['T_k3'], case_k['T_k4'], case_k['T_k5']), axis=0)
case_w_np = np.stack((case_w['T_w1'], case_w['T_w2'], case_w['T_w3'],case_w['T_w4'], case_w['T_w5']), axis=0)
case_sig_np = np.stack((case_sig['T_sig1'], case_sig['T_sig2'], case_sig['T_sig3'], case_sig['T_sig4'], case_sig['T_sig5']), axis=0)

print(f'Shape of case_k: {case_k_np.shape}\t case_w: {case_w_np.shape}\t case_sig: {case_sig_np.shape}')

case_k_tensor = torch.tensor(case_k_np).unsqueeze(2).to(torch.float)
case_w_tensor = torch.tensor(case_w_np).unsqueeze(2).to(torch.float)
case_sig_tensor = torch.tensor(case_sig_np).unsqueeze(2).to(torch.float)

torch.save(case_k_tensor, "dataset/normalized/case_k.pt")
torch.save(case_w_tensor, "dataset/normalized/case_w.pt")
torch.save(case_sig_tensor, "dataset/normalized/case_sig.pt")

print("Data successfully saved.")