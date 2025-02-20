import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Layout />
      </Provider>
    </Router>
  );
}

export default App;
