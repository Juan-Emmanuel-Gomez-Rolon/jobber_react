import React from "react";
import { SessionContext } from "../ctx";
import { useNavigate } from "react-router";
import LoginForm from "./LoginForm";
import { APP_DOMAIN } from "../utils";

export default function Login() {
    const { isLoggedIn, saveSession } = React.useContext(SessionContext);
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn]);

    const [error, setError] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        setError("");
        setLoading(true);

        fetch(APP_DOMAIN + "/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                setLoading(false);
                let data = await response.json();

                if (!response.ok && data.message) {
                    setError(data.message);
                }

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                saveSession({ user: data.user, authToken: data.token });
                // navigate("/dashboard");
                window.location.href = "/dashboard";
            })

            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-primary-100">
                <h1 className="text-3xl font-bold text-center mb-6">Jobber</h1>
                <div className="bg-gray-100 p-8 shadow-lg rounded-md min-w-[300px]">
                    <LoginForm
                        onSubmit={handleSubmit}
                        error={error}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    );
}
