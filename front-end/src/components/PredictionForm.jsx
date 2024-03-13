import React, { useState } from 'react';

function PredictionForm() {

    const [inputData, setInputData] = useState(''); // For the input data
    const [prediction, setPrediction] = useState(''); // For the prediction result
    
    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submit action
        try {
            // Send POST request to Flask server
            const response = await fetch('http://localhost:5000/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ inputs: parseFloat(inputData) }), // Adjust as needed for your model
            });
            const data = await response.json();
            setPrediction(data); // Set the prediction result
          } catch (error) {
            console.error('Error:', error);
          }
        };      


    return(
       <div>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='Enter Number'
            />
            <button type='submit'>Calc</button>
        </form>
        {prediction && <p>Calculation: {prediction}</p>}
       </div> 
    )
}

export default PredictionForm