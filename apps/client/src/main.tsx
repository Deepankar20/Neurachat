import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import "./index.css";
import App from "./App.tsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
document.cookie = "name=value; SameSite=Lax; Secure";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={`${PUBLISHABLE_KEY}`}>
      <App />
    </ClerkProvider>
  </StrictMode>
);
