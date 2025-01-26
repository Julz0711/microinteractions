import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MicrointeractionProvider } from "./context/MicrointeractionContext";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MicrointeractionProvider>
      <App />
    </MicrointeractionProvider>
  </StrictMode>
);
