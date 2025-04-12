import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CartManager } from "./context/CartManager";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartManager>
        <App />
      </CartManager>
    </BrowserRouter>
  </React.StrictMode>
);