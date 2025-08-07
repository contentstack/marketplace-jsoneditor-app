/* Import React modules */
import React from "react";
import { createRoot } from "react-dom/client";
/* Import other node modules */
/* Import our modules */
import App from "./containers/App";
/* Import node module CSS */
/* Import our CSS */
import "./index.css";

console.log("Before getElementById");
const container = document.getElementById("root");
console.log("Container:", container);
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);