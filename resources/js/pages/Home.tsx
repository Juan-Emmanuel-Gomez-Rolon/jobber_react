import React from "react";
import { SessionContext } from "../ctx";
import { Link } from "react-router-dom";

export default function Home() {
    const { isLoggedIn } = React.useContext(SessionContext);

    return (
        <>
            <div className="flex flex-col justify-between min-h-screen">
                <main
                    id="main-content"
                    className="container mx-auto flex flex-col items-center justify-center"
                >
                    <h1 className="text-3xl font-bold mt-4">
                        Bienvenido a Jobber
                    </h1>
                    <p className="mt-4">
                        Jobber es una plataforma para buscar empleo en el sector
                        tecnológico.
                    </p>
                    {isLoggedIn && (
                        <Link
                            to="/dashboard"
                            className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 mt-4"
                        >
                            Ir al dashboard
                        </Link>
                    )}
                    {!isLoggedIn && (
                        <div className="flex gap-2 mt-4">
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
                        </div>
                    )}
                </main>

                <footer className="bg-primary-800 text-white p-4 text-center">
                    <p>Jobber &copy; {new Date().getFullYear()}</p>
                </footer>
            </div>
        </>
    );
}
