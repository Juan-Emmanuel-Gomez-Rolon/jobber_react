import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactDOM from "react-dom/client";
import MyRoutes from "./routes";

import { SessionContextProvider } from "./ctx";

function App() {
    return <MyRoutes />;
}

const root = document.getElementById("app");
if (root) {
    const appRoot = ReactDOM.createRoot(root);
    appRoot.render(
        <SessionContextProvider>
            <App />
        </SessionContextProvider>
    );
}
