import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import App from "./App.tsx";

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "";
const posthogHost =
  import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com";

posthog.init(posthogKey, {
  api_host: posthogHost,
  autocapture: true,
  debug: true,
  person_profiles: "identified_only",
});

posthog.opt_in_capturing();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostHogProvider client={posthog}>
      <App />
    </PostHogProvider>
  </StrictMode>
);
