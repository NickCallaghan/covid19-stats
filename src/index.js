import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { SummaryProvider } from "./contexts/summary";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <SummaryProvider>
        <App />
      </SummaryProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
