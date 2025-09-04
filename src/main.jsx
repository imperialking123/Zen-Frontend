import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "./components/ui/provider";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
const VITE_CLIENT_ID = import.meta.env.VITE_CLIENT_ID

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={VITE_CLIENT_ID}  >
        <Provider>
          <App />
        </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);
