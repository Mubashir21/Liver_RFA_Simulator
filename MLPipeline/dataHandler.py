import torch
import numpy as np
from torch.utils.data import Dataset, DataLoader

def retrieveData():
    case_k = torch.load("dataset/normalized/case_k.pt")
    case_w = torch.load("dataset/normalized/case_w.pt")
    case_sig = torch.load("dataset/normalized/case_sig.pt")
    return case_k, case_w, case_sig

def prepareData():
    case_k, case_w, case_sig = retrieveData()
    case_k = case_k.tolist() 
    case_w = case_w.tolist()
    case_sig = case_sig.tolist()

    # deleting the first image from all of them
    for i in range(len(case_k)):
        case_k[i].pop(0)
        case_w[i].pop(0)
        case_sig[i].pop(0)

    # seperating the test from the training
    data_test = []
    data_train = []

    for i in range(5):
        if i != 2:
            data_train.append(case_k[i])
            data_train.append(case_w[i])
            data_train.append(case_sig[i])
        else:
            data_test.append(case_k[i])
            data_test.append(case_w[i])
            data_test.append(case_sig[i])

    # split the data into X and y targets for both training and testing
    X_train = []
    y_train = []

    X_test = []
    y_test = []

    for sample in data_train:
        train = []
        test = []
        for i in range(len(sample) - 1):
            train.append(sample[i])
            test.append(sample[i+1])
        X_train.append(train)
        y_train.append(test)

    for sample in data_test:
        train = []
        test = []
        for i in range(len(sample) - 1):
            train.append(sample[i])
            test.append(sample[i+1])
        X_test.append(train)
        y_test.append(test)

    X_train = np.array(X_train)
    y_train = np.array(y_train)
    X_test = np.array(X_test)
    y_test = np.array(y_test)

    # Convert NumPy arrays to PyTorch tensors
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    X_train = torch.tensor(X_train).to(torch.float).to(device)
    X_test = torch.tensor(X_test).to(torch.float).to(device)
    y_train = torch.tensor(y_train).to(torch.float).to(device)
    y_test = torch.tensor(y_test).to(torch.float).to(device)
    return [X_train, y_train, X_test, y_test]

class CustomDataset(Dataset):
    def __init__(self, X, y):
        if isinstance(X, torch.Tensor):
            self.X = X.clone().detach()
        else:
            self.X = torch.tensor(X)

        if isinstance(y, torch.Tensor):
            self.y = y.clone().detach()
        else:
            self.y = torch.tensor(y)

    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]
    
def getDataloader(X_data, y_data):
    dataset = CustomDataset(X_data, y_data)
    batch_size = 1
    return DataLoader(dataset, batch_size=batch_size, shuffle=True)