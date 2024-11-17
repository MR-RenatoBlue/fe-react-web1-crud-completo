import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavigationBar from "./components/NavigationBar";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NavigationBar/>
    <App />
  </React.StrictMode>
);
