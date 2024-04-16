import PredictionForm from "../components/PredictionForm";

function Model() {
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="max-w-[800px] mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-md text-black">
                    <p className="text-center text-xl font-bold mb-4">Simulation Model</p>
                    <PredictionForm />
                </div>
            </div>
        </div>
    );
}

export default Model;
