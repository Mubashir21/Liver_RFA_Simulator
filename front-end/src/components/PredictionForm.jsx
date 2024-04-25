import React, { useState, useRef, Fragment } from "react";
import VideoPlayer from "./VideoPlayer";
import { IconX } from "@tabler/icons-react";
import loader_icon from "../assets/loader_icon.webp";

// VideoModal Component
function VideoModal({ isOpen, onClose, videoPath }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg p-4">
        <button onClick={onClose} className="absolute top-0 right-0 p-4">
          <IconX size={24} />
        </button>
        <h3 className="text-3xl font-bold leading-6 text-gray-900 text-center pt-2 ">
          Prediction Successful
        </h3>
        <div className="mt-2">
          <VideoPlayer
            videoPath={videoPath}
            className="aspect-video shadow-2xl border-solid border border-black rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

// LoadingModal Component
function LoadingModal({ isLoading, onClose }) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-25"
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="relative bg-white rounded-2xl p-6 text-left align-middle shadow-xl">
          <img src={loader_icon} alt="loading icon" />
        </div>
      </div>
    </div>
  );
}

function PredictionForm() {
  const [file, setFile] = useState(null);
  const [videoPath, setVideoPath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [k, setK] = useState("");
  const [w, setW] = useState("");
  const [sig, setSig] = useState("");
  const [duration, setDuration] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("No file selected");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("k", k);
      formData.append("w", w);
      formData.append("sig", sig);
      formData.append("duration", duration);

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const videoBlob = await response.blob();
        const videoURL = URL.createObjectURL(videoBlob);
        setVideoPath(videoURL);
        setShowPopup(true);
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while predicting. Please try again."); // Show error feedback
    } finally {
      setIsLoading(false); // Ensure loading is set to false in all cases
      fileInputRef.current.value = ""; // Reset the file input
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="border border-solid rounded-lg border-gray-300 py-5 shadow-2xl px-8">
      <p className="mx-auto font-bold text-center text-3xl mb-6">
        Simulation Form
      </p>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 rounded-lg"
      >
        <label htmlFor="file" className="px-4 -mb-4">
          Initial liver condition
        </label>
        <input
          type="file"
          name="file"
          accept=".npy"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
      file:bg-gray-50 file:border-0 file:me-4 file:py-2 file:px-4"
        />
        <input
          type="number"
          placeholder="Enter k value"
          value={k}
          onChange={(e) => setK(e.target.value)}
          className="py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Enter w value"
          value={w}
          onChange={(e) => setW(e.target.value)}
          className="py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Enter sig value"
          value={sig}
          onChange={(e) => setSig(e.target.value)}
          className="py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          placeholder="Enter duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="py-2 px-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:bg-blue-600"
        >
          Predict
        </button>
      </form>
      <LoadingModal isLoading={isLoading} onClose={() => setIsLoading(false)} />
      <VideoModal
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        videoPath={videoPath}
      />
    </div>
  );
}

export default PredictionForm;
