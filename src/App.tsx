import "./App.css";
import DeviceBox from "./components/deviceBox";

function App() {
  return (
    <>
      <div className="flex p-8">
        <DeviceBox
          deviceName="Deckenleuchte"
          icon="FaLightbulb"
          activeColor="bg-yellow"
          hasAdditionalInfo={true}
        />
      </div>
    </>
  );
}

export default App;
