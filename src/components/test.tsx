import DevicePreview from "./DevicePreview";
import { useDispatch, useSelector } from "react-redux";
import { setHasMicrointeractions } from "../store/reducer";
import { AppState } from "../store/store";

const Test = () => {
  const dispatch = useDispatch();

  const hasMicrointeractions = useSelector(
    (state: AppState) => state.app.hasMicrointeractions
  );
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4">
        <button
          onClick={() => dispatch(setHasMicrointeractions(false))} // Set to false
          className="bg-red text-white border-4 border-red px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:text-red"
        >
          Disable Microinteractions
        </button>
        <button
          onClick={() => dispatch(setHasMicrointeractions(true))} // Optional: Enable it again
          className="bg-green text-white border-4 border-green px-4 py-2 rounded-md cursor-pointer hover:bg-transparent hover:text-green"
        >
          Enable Microinteractions
        </button>
        <p className="text-uwu ">
          hasMicrointeractions:{" "}
          <span className="font-bold">
            {hasMicrointeractions ? "true" : "false"}
          </span>
        </p>
      </div>
      <div className="flex nowrap gap-800">
        {/* <span>
          <DevicePreview
            deviceName="Deckenleuchte"
            icon="FaLightbulb"
            activeColor="bg-yellow"
            hasAdditionalInfo={true}
          />
        </span>
        <span>
          <DevicePreview
            deviceName="Deckenleuchte"
            icon="FaLightbulb"
            activeColor="bg-yellow"
            hasAdditionalInfo={true}
            hasToggle={true}
          />
        </span> */}
      </div>
    </div>
  );
};

export default Test;
