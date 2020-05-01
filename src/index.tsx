import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { SummaryProvider } from "./contexts/summary";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <SummaryProvider>
        <App />
      </SummaryProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
