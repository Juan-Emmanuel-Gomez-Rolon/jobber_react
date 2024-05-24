import React from "react";

import ActivityIndicator from "../components/ActivityIndicator";

export default function LoginForm({ onSubmit, error, loading = false }) {
    return (
        <form
            action="/login"
            method="post"
            className="flex flex-col gap-4"
            onSubmit={onSubmit}
        >
            <h1 className="text-lg font-bold">Inicio de sesión</h1>
            <div className="flex flex-col">
                <label className="text-sm" htmlFor="email">
                    Correo electrónico
                </label>
                <input
                    className="rounded border border-gray-300 px-2 py-1"
                    type="email"
                    name="email"
                    id="email"
                />
            </div>
            <div className="flex flex-col ">
                <label className="text-sm" htmlFor="password">
                    Contraseña
                </label>
                <input
                    className="rounded border border-gray-300 px-2 py-1"
                    type="password"
                    name="password"
                    id="password"
                />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            {loading && <ActivityIndicator />}
            <button
                className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                type="submit"
            >
                Iniciar sesión
            </button>
        </form>
    );
}
