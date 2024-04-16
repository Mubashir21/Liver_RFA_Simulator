import React, { useState, useRef, Fragment } from "react";
import VideoPlayer from "./VideoPlayer";
import { Dialog, Transition } from "@headlessui/react";
import { IconX } from "@tabler/icons-react";

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
    }

    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="h-96 flex items-center justify-center">
      <div className="max-w-lg flex flex-col text-center border border-black p-5 rounded-xl shadow-xl">
        <div className="text-gray-900 text-5xl font-bold mb-10">
          <h1>Predict</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 p-4 rounded-lg"
        >
          <input
            type="file"
            accept=".npy"
            onChange={handleFileChange}
            ref={fileInputRef}
            className="py-2 px-4 focus:outline-none focus:border-blue-500"
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
            Submit
          </button>
        </form>
        {isLoading && (
          <Transition appear show={isLoading} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-10"
              onClose={() => setIsLoading(false)}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black/25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Loading...
                      </Dialog.Title>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        )}
        {videoPath && showPopup && (
          <div>
            <Transition appear show={showPopup} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setShowPopup(false)}
              >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <span onClick={() => setShowPopup(false)}>
                          <IconX />
                        </span>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900"
                        >
                          Prediction successful.
                        </Dialog.Title>
                        <div className="mt-2">
                          <VideoPlayer videoPath={videoPath} />
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictionForm;