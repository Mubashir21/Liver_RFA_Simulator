import PredictionForm from "../components/PredictionForm";

function Model() {
    return (
        <div className="relative h-screen">
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 object-cover w-full h-full"
                src="aboutbg.mp4"
                type="video/mp4"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="sm:w-4/5 md:w-3/5 lg:w-2/3 xl:w-1/2 mx-auto max-w-xl">
                    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md text-black relative z-10">
                        <p className="text-center text-base sm:text-lg font-bold">Simulation Model Predict</p>
                        <PredictionForm />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Model;
