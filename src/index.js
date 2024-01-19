import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter basename="/uni-birth">
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
);
