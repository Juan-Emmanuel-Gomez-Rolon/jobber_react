import React from "react";
import { SessionContext } from "../ctx";
import { Link } from "react-router-dom";
import { APP_DOMAIN } from "../utils";

export default function AppHeader() {
    const { isLoggedIn, authToken, logout } = React.useContext(SessionContext);

    const handleLogout = () => {
        if (!confirm("¿Estás seguro de que deseas cerrar sesión?")) {
            return;
        }
        fetch(APP_DOMAIN + "/api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (response) => {
                logout();
                window.location.href = "/";
            })

            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <a href="#main-content" className="sr-only focus:not-sr-only">
                Ir al contenido principal
            </a>
            <nav className="flex justify-between items-center px-6 py-4 bg-white text-primary-950 shadow-sm">
                {!isLoggedIn && (
                    <Link to="/" className="text-2xl">
                        Jobber
                    </Link>
                )}
                {isLoggedIn && (
                    <Link to="/dashboard" className="text-2xl">
                        Jobber
                    </Link>
                )}
                <div className="flex gap-4">
                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/register"
                                className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                            >
                                Crear cuenta
                            </Link>
                            <Link
                                to="/login"
                                className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                            >
                                Iniciar sesión
                            </Link>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <Link
                                to="/me"
                                className="hover:underline cursor-pointer"
                            >
                                Mi perfil
                            </Link>
                            <a
                                href="#"
                                className="hover:underline cursor-pointer"
                                onClick={handleLogout}
                            >
                                Cerrar sesión
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
}
