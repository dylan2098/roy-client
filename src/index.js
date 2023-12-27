import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import reportWebVitals from './reportWebVitals';

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import "assets/scss/custom.scss";

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);

reportWebVitals();