import torch
from neuralop.models import FNO
from neuralop import H1Loss
from dataHandler import prepareData, getDataloader
from helper import saveModel

def trainModel(epochs, model, loss_fn, optimizer, train_dl, test_dl):

    for epoch in range(epochs):
        model.train()

        for input, output in train_dl:

            input = input.squeeze(0)
            output = output.squeeze(0)

            optimizer.zero_grad()

            y_pred = model(input)

            loss = loss_fn(y_pred, output)
            # acc = acc_fn(y_preds, y_train)

            loss.backward()

            optimizer.step()

        if epoch % 5 == 0:
            total_loss = 0
            model.eval()
            with torch.inference_mode():

                for input, output in test_dl:
                    input, output = input.squeeze(0), output.squeeze(0)

                    test_pred = model(input)
                    test_loss = loss_fn(test_pred, output)
                    total_loss += test_loss

                # test_acc = acc_fn(test_pred, y_test)
                print(f"Epoch: {epoch} | Train Loss: {loss:.5f} | Test Loss: {test_loss:.5f}")

if __name__ == '__main__':

    if torch.cuda.is_available:
        print("CUDA is available. Running on GPU.")
        device = "cuda"
    else:
        print("CUDA is unavailable. Running on CPU.")
        device = "cpu"

    # load data
    data = prepareData()
    print(len(data))
    train_dataloader = getDataloader(data[0], data[1])
    test_dataloader = getDataloader(data[2], data[3])

    model = FNO(n_modes=(16, 16), hidden_channels=32,
                in_channels=1, out_channels=1).to(device)
    
    loss_fn = H1Loss(d=2) # Loss function
    optimizer = torch.optim.Adam(params=model.parameters(), lr=0.01) # Optimizer

    trainModel(70, model, loss_fn, optimizer, train_dataloader, test_dataloader)

    saveModel(model)