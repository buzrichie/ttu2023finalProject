import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { UserProvider } from "./contexts/UserContext";
import { CRUDTableProvider } from "./contexts/crudTableContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <UserProvider>
        <CRUDTableProvider>
          <App />
        </CRUDTableProvider>
      </UserProvider>
    </ContextProvider>
  </React.StrictMode>
);
