import { BrowserRouter as Router, useLocation } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store/store";
import Debug from "./components/Debug";
import { Instructions } from "./components/Instructions";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout />
        <Debug />
        <ConditionalInstructions />
      </Provider>
    </Router>
  );
}

function ConditionalInstructions() {
  const location = useLocation();
  return location.pathname !== "/start" ? <Instructions /> : null;
}

export default App;
