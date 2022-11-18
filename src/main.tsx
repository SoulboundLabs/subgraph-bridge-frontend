// Polyfill needed for hardware wallet modules
import { Buffer } from "buffer";
import "rc-slider/assets/index.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/css/index.css";

window.Buffer = Buffer;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
