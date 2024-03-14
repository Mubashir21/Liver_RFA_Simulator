import React, { useState } from 'react';

function PredictionForm() {

    const [file, setfile] = useState(null); // For the input data
    const [video, setVideoPath] = useState(''); // For the prediction result

    const handleFileChange = (event) => {
      setfile(event.target.files[0]);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submit action
    
      try {
        // Check if a file is selected
        if (!file) {
          alert('No file selected');
          return;
        }

        const formData = new FormData();
        formData.append('file', file)
    
        // Send POST request to Flask server
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData, // Sending the file content as array
        });
    
        if(response.ok) {
          console.log('File uploaded successfully');
        } else {
            throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    return(
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".npy"
            onChange={handleFileChange}
          />
        <button type="submit">Submit</button>
        </form>
      </div> 
    )
}

export default PredictionForm