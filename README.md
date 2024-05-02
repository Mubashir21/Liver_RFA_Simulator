# Getting Started with Setup

Welcome to the everything repo concerning our SEGP project - Group K.

## Pull the Entire Repository

If you're unfamiliar with pulling repositories, you can watch a YouTube tutorial on how to do this.

## Running the Front-end (React)

To run the front-end of our application, which is built using React, follow these steps:

1. **Install Node.js**: Node.js is required to run JavaScript on your computer. You can download and install it from [here](https://nodejs.org/).

2. **Install the `serve` Package**: `serve` is a package that provides a simple HTTP server for serving static files. You can install it globally using npm:

```
npm install -g serve
```

3. **Navigate to the Build Directory**: Once installed, navigate to the build directory of your React application.

4. **Run the Server**: Use the following command to serve your application:

```
serve -s build
```

This command starts a static file server and serves your built React application. Ensure that the server is running.

## Running the Back-end (Flask)

To run the back-end of our application, which is built using Flask, follow these steps:

1. **Install Python**: Python is required to run the Flask server. You can download and install it from [here](https://www.python.org/downloads/).

2. **Activate Virtual Environment**: Navigate to the back-end directory and activate the virtual environment by running the following command in the terminal:

```
venv/Scripts/activate.ps1
```

3. **Install Dependencies**: Install the required Python packages using pip:

```
pip install -r requirements.txt
```

4. **Run the Server**: Start the Flask server by running the following command:

```
python app.py
```

## Notes

- Ensure that both the front-end and back-end servers are running simultaneously for the website to work effectively.
- If you encounter any problems with installing or running the code, please don't hesitate to contact Mubashir.
