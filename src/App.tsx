import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store/store";
import { Instructions } from "./components/Instructions";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout />
        <Instructions />
      </Provider>
    </Router>
  );
}

export default App;
