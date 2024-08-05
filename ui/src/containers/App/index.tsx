import React from "react";
import { HashRouter, Route, Routes,BrowserRouter } from "react-router-dom";
import ErrorBoundary from "../../components/ErrorBoundary";
import ConfigScreen from "../ConfigScreen";
import CustomField from "../CustomField";
import "./venus.css";
import "./styles.scss";


/* App - The main app component that should be rendered */
const App: React.FC = function () {
  const Router =
 window.location?.href.includes("#") ? HashRouter : BrowserRouter;
  return (
    <div className="app">
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/config" element={<ConfigScreen />} />
            <Route path="/custom-field" element={<CustomField />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
};

export default App;
