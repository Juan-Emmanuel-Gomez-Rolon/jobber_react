import React from "react";
import { SessionContext } from "../ctx";
import { useNavigate } from "react-router";
import InputText from "../components/InputText";
import { APP_DOMAIN } from "../utils";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function Register() {
    const { isLoggedIn, saveSession } = React.useContext(SessionContext);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn]);

    const [errors, setErrors] = React.useState({} as Record<string, string>);
    const [error, setError] = React.useState("");

    const [account_type, setAccountType] = React.useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
        setErrors({});

        fetch(APP_DOMAIN + "/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(async (response) => {
                let data = await response.json();

                if (!response.ok && data.message) {
                    setError(data.message);
                    console.log(data.errors);
                    // let new_errors = {} as Record<string, string>;

                    // for (const key in data.errors) {
                    //     new_errors[key] = data.errors[key][0];
                    // }

                    // setErrors(new_errors);
                    // console.log(new_errors);
                    setErrors(data.errors);
                }

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                saveSession({ user: data.user, authToken: data.token });
                // navigate("/dashboard");
                window.location.href = "/dashboard";
            })

            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center justify-center bg-primary-100">
                <h1 className="text-3xl font-bold text-center mb-6">Jobber</h1>
                <div className="bg-gray-100 p-8 shadow-lg rounded-md w-full min-w-[300px] max-w-md">
                    <form
                        action="/register"
                        method="post"
                        className="flex flex-col gap-4"
                        onSubmit={handleSubmit}
                    >
                        <p className="text-lg font-bold">Crear cuenta</p>
                        <InputText
                            label="Nombre"
                            name="name"
                            required
                            error={errors["name"]}
                        />
                        <InputText
                            label="Correo electrónico"
                            required
                            name="email"
                            type="email"
                            error={errors["email"]}
                        />
                        <InputText
                            label="Teléfono"
                            name="phone"
                            error={errors["phone"]}
                        />
                        <InputText
                            label="Descripción de perfil"
                            name="description"
                            error={errors["description"]}
                            placeholder="Hábil con las redes sociales, etc."
                        />
                        <InputText
                            label="Contraseña"
                            name="password"
                            type="password"
                            required
                            error={errors["password"]}
                        />

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                                Tipo de cuenta
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="account_type"
                                label="Tipo de cuenta"
                                required
                            >
                                <MenuItem value={"applicant"}>
                                    Busco trabajo
                                </MenuItem>
                                <MenuItem value={"recruiter"}>
                                    Soy reclutador
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {error && (
                            <div className="text-red-500 text-sm">{error}</div>
                        )}
                        <button
                            className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
                            type="submit"
                        >
                            Registrarme
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
