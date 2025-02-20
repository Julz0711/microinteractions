import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store/store";
import Debug from "./components/Debug";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout />
        <Debug />
      </Provider>
    </Router>
  );
}

export default App;
