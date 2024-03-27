import torch
import numpy as np
from torch.utils.data import Dataset, DataLoader
import helper

def retrieveData(input="no"):
    if input.lower() == "no":
        case_k = torch.load("dataset/normalized/case_k.pt")
        case_w = torch.load("dataset/normalized/case_w.pt")
        case_sig = torch.load("dataset/normalized/case_sig.pt")
        return case_k, case_w, case_sig
    else:
        case_k = torch.load("dataset/normalized_with_input_parameters/case_k_params.pt")
        case_w = torch.load("dataset/normalized/normalized_with_input_parameters/case_w_params.pt")
        case_sig = torch.load("dataset/normalized/normalized_with_input_parameters/case_sig_params.pt")
        return case_k, case_w, case_sig

def AddMoreChannels():
    case_k_values = {"T_k1" : 0.46, "T_k2" : 0.48, "T_k3" : 0.50, "T_k4" : 0.52, "T_k5" : 0.52}
    case_w_values = {"T_w1" : 0.0045, "T_w2" : 0.0055, "T_w3" : 0.0065, "T_w4" : 0.0075, "T_w5" : 0.0085}
    case_sig_values = {"T_sig1" : 0.0045, "T_sig2" : 0.0055, "T_sig3" : 0.0065, "T_sig4" : 0.0075, "T_sig5" : 0.0085}
    
    # Initialize an empty dictionary to store arrays
    value_arrays = {} #rename this dict

    # Iterate through each dictionary
    for case_values in [case_k_values, case_w_values, case_sig_values]:
        for key, value in case_values.items():
            # Create an array of size 101 by 101 with all elements set to the corresponding value
            value_arrays[key] = np.full((101, 101), value)

    case_k, case_w, case_sig = retrieveData()
    case_k = case_k.numpy()
    case_w = case_w.numpy()
    case_sig = case_sig.numpy()

    new_case_k = np.empty((5, 121, 4, 101, 101))
    for i in range(len(case_k)):
        current_sample = case_k[i] # current sample

        new_channels = np.stack((value_arrays[f"T_k{i + 1}"], value_arrays["T_w3"], value_arrays["T_sig3"]), axis=0)
        new_channels_reshaped = new_channels.reshape(1, 3, 101, 101)
        new_channels_repeated = np.repeat(new_channels_reshaped, current_sample.shape[0], axis=0)
        final_array = np.concatenate((current_sample, new_channels_repeated), axis=1)
        final_array_reshaped = final_array.reshape(1, 121, 4, 101, 101)
        new_case_k[i] = final_array_reshaped # problematic from here
    new_case_k = torch.tensor(new_case_k).to(torch.float)
    torch.save(new_case_k, "dataset/normalized_with_input_parameters/case_k_params.pt")

    new_case_w = np.empty((5, 121, 4, 101, 101))
    for i in range(len(case_w)):
        current_sample = case_w[i] # current sample

        new_channels = np.stack((value_arrays["T_k3"], value_arrays[f"T_w{i + 1}"], value_arrays["T_sig3"]), axis=0)
        new_channels_reshaped = new_channels.reshape(1, 3, 101, 101)
        new_channels_repeated = np.repeat(new_channels_reshaped, current_sample.shape[0], axis=0)
        final_array = np.concatenate((current_sample, new_channels_repeated), axis=1)
        final_array_reshaped = final_array.reshape(1, 121, 4, 101, 101)
        new_case_w[i] = final_array_reshaped # problematic from here
    new_case_w = torch.tensor(new_case_w).to(torch.float)
    torch.save(new_case_w, "dataset/normalized_with_input_parameters/case_w_params.pt")

    new_case_sig = np.empty((5, 121, 4, 101, 101))
    for i in range(len(case_sig)):
        current_sample = case_sig[i] # current sample

        new_channels = np.stack((value_arrays["T_k3"], value_arrays["T_w3"], value_arrays[f"T_sig{i + 1}"]), axis=0)
        new_channels_reshaped = new_channels.reshape(1, 3, 101, 101)
        new_channels_repeated = np.repeat(new_channels_reshaped, current_sample.shape[0], axis=0)
        final_array = np.concatenate((current_sample, new_channels_repeated), axis=1)
        final_array_reshaped = final_array.reshape(1, 121, 4, 101, 101)
        new_case_sig[i] = final_array_reshaped # problematic from here
    new_case_sig = torch.tensor(new_case_sig).to(torch.float)
    torch.save(new_case_sig, "dataset/normalized_with_input_parameters/case_sig_params.pt")
    
    print(f"Saved the files successfully!")

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

if __name__ == "__main__":
    AddMoreChannels()