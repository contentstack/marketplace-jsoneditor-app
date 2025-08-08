/* Import React modules */
import React from "react";
import { createRoot } from "react-dom/client";
/* Import other node modules */
/* Import our modules */
import App from "./containers/App";
/* Import node module CSS */
/* Import our CSS */
import "./index.css";

const container = document.getElementById("root");
<<<<<<< HEAD
const root = createRoot(container); // createRoot(container!) if you use TypeScript
=======
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
>>>>>>> ad4a7b4 (fix: lint issues and console log issues)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);