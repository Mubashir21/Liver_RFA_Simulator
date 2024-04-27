import { useState } from "react";

import PredictionForm from "../components/PredictionForm";
import realPred from "../assets/videos/best_prediction_3_1_1.mp4";
import realPredRMSE from "../assets/videos/3way_comparison.mp4";

function Model() {
  const [isError, setIsError] = useState(false);

  return (
    <div className="bg-slate-50 text-black">
      <ModelPrediction />
      <ModelExample isError={isError} setIsError={setIsError} />
    </div>
  );
}

const ModelPrediction = () => {
  return (
    <div className=" text-black h-full bg-slate-50 px-80">
      <div className="flex justify-between py-16">
        <div className="flex-col w-1/2">
          <p className="text-black font-bold text-6xl mb-5">
            Make Your Simulations A Reality
          </p>
          <p className="text-black text-2xl mb-5 my-2">
            Model takes 5 parameters:
          </p>
          <ul className="list-disc pl-6">
            <li>Inititial Liver Condition</li>
            <li>Thermal Conductivity</li>
            <li>Blood Perfusion Rate</li>
            <li>Electrical Conductivity</li>
            <li>Duration of Simulation</li>
          </ul>
          <p className="text-black my-5 text-justify">
            To understand the model’s predictive capabilities, it’s essential to
            consider the five key inputs it processes. First is the initial
            liver condition, often visualized as a heatmap, which provides a
            starting reference for the simulation, detailing the pre-ablation
            temperature distribution and any existing anomalies within the liver
            tissue. <br /> <br />
            The second input, thermal conductivity, accounts for the liver’s
            capacity to transfer heat, which affects how temperature gradients
            evolve during ablation. Closely related is the third factor, blood
            perfusion rate, which reflects the cooling effect provided by blood
            flow – a critical component in predicting the extent of heat
            distribution. The fourth input, electrical conductivity, is integral
            as it determines how the radiofrequency energy is distributed
            through the liver tissue, crucial for estimating the ablation zone.
            Lastly, the duration of the simulation defines the timeframe over
            which the ablation is modeled, dictating the temporal precision of
            the procedure’s outcome predictions. Together, these inputs allow
            the model to simulate the RFA process with remarkable detail,
            providing clinicians with a predictive glimpse into the procedure's
            potential results.
          </p>
        </div>
        <div className="flex items-center">
          <PredictionForm />
        </div>
      </div>
    </div>
  );
};

const ModelExample = ({ isError, setIsError }) => {
  return (
    <div className="px-80 pb-16 bg-gray-200">
      <div className="py-8">
        <div className=" bg-gray-900 z-30 -mt-16 w-fit flex gap-1 p-1 mb-8 text-center text-lg justify-center m-auto border solid border-black rounded-lg shadow-lg">
          <div
            className={`font-bold  p-3 rounded-md transition-all cursor-pointer w-96 ${
              isError ? "bg-white hover:bg-gray-300" : "bg-gray-900 text-white "
            }`}
            onClick={() => setIsError(false)}
          >
            Comparison
          </div>
          <div
            className={`font-bold p-3 rounded-md transition-all cursor-pointer w-96 ${
              isError ? "text-white bg-gray-900" : "hover:bg-gray-300 bg-white"
            }`}
            onClick={() => setIsError(true)}
          >
            Comparison with Error
          </div>
        </div>
      </div>
      {isError ? <PredTruthError /> : <TruthPred />}
    </div>
  );
};

const TruthPred = () => {
  return (
    <div className="flex">
      <div className="flex-1">
        <video
          src={realPred}
          controls
          className="aspect-video shadow-2xl border-solid border-4 border-gray-400 rounded-xl bg-white"
        ></video>
      </div>
      <div className="flex-1 my-1 pl-16">
        <p className="text-3xl font-bold mb-3">Ground Truth vs Prediction</p>
        <p>
          The video provides a side-by-side comparison: the actual ground truth
          thermal map is displayed on the left, while the model's prediction is
          showcased on the right. Upon examination, the gradients and thermal
          distributions exhibit a remarkable congruence, highlighting the
          model’s precision. This compelling alignment goes beyond superficial
          similarity; it indicates an in-depth understanding by the model of the
          complex interplay between heat transfer and tissue properties. The
          nuanced variations in temperature, captured consistently across both
          videos, underscore the model's ability to grasp and replicate the
          intricate thermal dynamics at play during the ablation procedure. Such
          accurate learning of the underlying physics is crucial, as it can
          potentially lead to improved predictive capabilities in real-time
          clinical settings, ultimately aiding in the customization of treatment
          for individual patients and enhancing therapeutic outcomes.
        </p>
      </div>
    </div>
  );
};

const PredTruthError = () => {
  return (
    <div className="flex ">
      <div className="flex-1">
        <video
          src={realPredRMSE}
          controls
          className="aspect-video shadow-2xl border-solid border-4 border-gray-400 rounded-xl bg-white"
        ></video>
      </div>
      <div className="flex-1 my-1 pl-16">
        <p className="text-3xl font-bold mb-3">
          Ground Truth vs Prediction vs Error
        </p>
        <p>
          The video arranges three critical plots for comparative analysis. On
          the left, we have the ground truth thermal map, capturing the actual
          state of the liver during ablation. Centered is the model's
          prediction, a computed image that estimates the thermal spread. On the
          right, the difference plot starkly reveals the discrepancies between
          the ground truth and the prediction. This triptych presentation is a
          powerful tool for evaluation, allowing us to appreciate not just the
          model's accuracy in replicating the thermal dynamics but also to
          pinpoint the specific areas and degrees of variance. The alignment
          between the ground truth and prediction plots confirms the model's
          robust learning capabilities, while the difference plot serves as a
          guide for targeted improvements, ultimately striving for a model that
          can mirror the complex reality of patient-specific treatments with
          even greater fidelity.
        </p>
      </div>
    </div>
  );
};

export default Model;
