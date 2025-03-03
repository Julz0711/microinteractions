import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "", {
  api_host:
    import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
  autocapture: true,
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
