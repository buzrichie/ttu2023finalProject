import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { UserProvider } from "./contexts/UserContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </ContextProvider>
  </React.StrictMode>
);
