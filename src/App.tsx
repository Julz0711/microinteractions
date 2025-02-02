import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRouter from "./routes/Router";
import Layout from "./Layout";
import Test from "./components/test";

function App() {
  return (
    <Router>
      <Layout children={""} />
      <AppRouter />
      <Test />
    </Router>
  );
}

export default App;
