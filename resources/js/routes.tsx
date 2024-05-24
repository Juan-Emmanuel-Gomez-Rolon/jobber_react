import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PersonalProfile from "./pages/PersonalProfile";
import OfferDetails from "./pages/Offers/OfferDetails";
import Profile from "./pages/Profile";
import CreateOffer from "./pages/Offers/CreateOffer";
import EditOffer from "./pages/Offers/EditOffer";

export default function MyRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={Home} />
                <Route path="/login" Component={Login} />
                <Route path="/dashboard" Component={Dashboard} />
                <Route path="/register" Component={Register} />
                <Route path="/me" Component={PersonalProfile} />
                <Route path="/offers/create" Component={CreateOffer} />
                <Route path="/offers/:id" Component={OfferDetails} />
                <Route path="/offers/:id/edit" Component={EditOffer} />
                <Route path="/profile/:id" Component={Profile} />
                <Route
                    path="*"
                    element={<div>Ruta no válida mi estimade</div>}
                />
            </Routes>
        </Router>
    );
}
