import "./App.css";
import Test from "./components/test";
import TopNavigation from "./components/topNavigation";

function App() {
  return (
    <div className="h-screen w-screen grid grid-cols-2 gap-4 p-8 bg-dark">
      {/* Dummy Phone Section */}
      <div className="flex flex-col gap-8 p-8 items-start justify-start border border-gray-300 rounded-[2rem] shadow-lg bg-light">
        {/* Phone Content */}
        <TopNavigation />
        <Test />
      </div>

      {/* Introduction Section */}
      <div className="p-8 border-light border-2 rounded-[2rem] shadow-md">
        <h1 className="text-2xl text-light font-bold mb-4">
          Microinteractions A/B-TEst
        </h1>
        <p className="text-light mb-4">
          This is a simulation of a mobile phone for testing purposes. On the
          left, you can interact with the "phone" interface.
        </p>
        <p className="text-light">
          The content inside the phone is scrollable. However, the rest of the
          screen remains static, allowing you to focus on the simulation
          experience.
        </p>
      </div>
    </div>
  );
}

export default App;
