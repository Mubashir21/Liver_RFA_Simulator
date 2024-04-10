import React, { useState, useRef } from 'react';

function PredictionForm() {

    const [file, setFile] = useState(null); // For the input data
    const [videoPath, setVideoPath] = useState(''); // For the prediction result
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
      setFile(event.target.files[0]);
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submit action
    
      // Check if a file is selected
      if (!file) {
        alert('No file selected');
        return;
      }

      setIsLoading(true)

      try {
        const formData = new FormData();
        formData.append('file', file)
    
        // Send POST request to Flask server
        const response = await fetch('http://localhost:5000/predict', {
          method: 'POST',
          body: formData, // Sending the file content as array
        });
    
        if (response.ok) {
          console.log('File uploaded successfully');
          const videoBlob = await response.blob(); // Get the video blob from the response
          const videoURL = URL.createObjectURL(videoBlob); // Create a URL for the video
          setVideoPath(videoURL); // Update state to hold the video URL
          setShowPopup(true);
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Error:', error);
      }

      setIsLoading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    return(
      <div className="flex items-center justify-center h-full">
        <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept=".npy"
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <br/><br/><br/>
              <div className="flex justify-center select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  <button type="submit">Submit</button>
              </div>
        </form>
        {isLoading && <h3>Loading...</h3>}
        {videoPath && showPopup && (<div>
          <div>
            <br />
            <button className='close-btn' onClick={() => setShowPopup(false)}>Close</button>
            <VideoPlayer videoPath={videoPath}/>
          </div>
        </div>
          )}
        </div>
      </div> 
    )
}

export default PredictionForm