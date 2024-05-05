import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Deposits from "./Deposits";
// Import other components as needed

const routes = [
    {
        path: "/",
        element: <App />,
        // rules: ...
    },
    {
        path: "/deposits",
        element: <Deposits />,
        // rules: ...
    },
    // Add more routes as needed
];

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
