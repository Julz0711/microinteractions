import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "";
const posthogHost =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

const options = {
  api_host: posthogHost,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider apiKey={posthogKey} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
