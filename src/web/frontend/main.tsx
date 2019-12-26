import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"

import "./style.css";
import App from "./components/app";

ReactDOM.render(
    <Router>
        <div>
            <App />
        </div>
    </Router>,
    document.getElementById("root")
)