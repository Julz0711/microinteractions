import "./App.css";
import DeviceBox from "./components/deviceBox";
import { useMicrointeractionContext } from "./context/MicrointeractionContext";

function App() {
  const { hasMicrointeractions, setHasMicrointeractions } =
    useMicrointeractionContext();

  return (
    <div className="flex flex-col p-8 gap-8">
      <div className="flex gap-4">
        <button
          onClick={() => setHasMicrointeractions(false)} // Set to false
          className="bg-red text-white border-2 border-red px-4 py-2 rounded-md cursor-pointer hover:bg-dark hover:text-red"
        >
          Disable Microinteractions
        </button>
        <button
          onClick={() => setHasMicrointeractions(true)} // Optional: Enable it again
          className="bg-green text-white border-2 border-green px-4 py-2 rounded-md cursor-pointer hover:bg-dark hover:text-green"
        >
          Enable Microinteractions
        </button>
      </div>
      <div className="flex">
        <DeviceBox
          deviceName="Deckenleuchte"
          icon="FaLightbulb"
          activeColor="bg-yellow"
          hasAdditionalInfo={true}
        />
      </div>
    </div>
  );
}

export default App;
