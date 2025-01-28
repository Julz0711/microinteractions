import React from "react";
import DeviceBox from "./deviceBox";
import { useMicrointeractionContext } from "../context/MicrointeractionContext";

const test = () => {
  const { hasMicrointeractions, setHasMicrointeractions } =
    useMicrointeractionContext();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <button
          onClick={() => setHasMicrointeractions(false)} // Set to false
          className="bg-red text-white border-4 border-red px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:text-red"
        >
          Disable Microinteractions
        </button>
        <button
          onClick={() => setHasMicrointeractions(true)} // Optional: Enable it again
          className="bg-green text-white border-4 border-green px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:text-green"
        >
          Enable Microinteractions
        </button>
        <p className="text-dark ">
          hasMicrointeractions:{" "}
          <span className="font-bold">
            {hasMicrointeractions ? "true" : "false"}
          </span>
        </p>
      </div>
      <div className="flex nowrap gap-800">
        <span>
          <DeviceBox
            deviceName="Deckenleuchte"
            icon="FaLightbulb"
            activeColor="bg-yellow"
            hasAdditionalInfo={true}
          />
        </span>
        <span>
          <DeviceBox
            deviceName="Deckenleuchte"
            icon="FaLightbulb"
            activeColor="bg-yellow"
            hasAdditionalInfo={true}
            hasToggle={true}
          />
        </span>
      </div>
    </div>
  );
};

export default test;
