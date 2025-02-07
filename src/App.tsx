import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import Test from "./components/Test";

function App() {
  return (
    <Router>
      <Layout children={""} />
      <Test />
    </Router>
  );
}

export default App;
