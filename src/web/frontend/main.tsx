import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./style.css";
import "react-toastify/dist/ReactToastify.min.css";
import App from "./components/App";
import { toast } from "react-toastify";

toast.configure();

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
