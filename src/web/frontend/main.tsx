import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom"

import "./style.css";
import App from "./components/App";
import BrandLogo from "./components/BrandLogo";

ReactDOM.render(
    <Router>
        <div>
            <header>
                <BrandLogo />
            </header>
            <main>
                <App />
            </main>
        </div>
    </Router>,
    document.getElementById("root")
)