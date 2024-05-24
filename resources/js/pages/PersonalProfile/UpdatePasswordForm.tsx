import React from "react";
import SectionForm from "../../components/SectionForm";
import InputText from "../../components/InputText";
import { IUser } from "../../interfaces";
import { SessionContext } from "../../ctx";
import { APP_DOMAIN } from "../../utils";

export default function UpdatePasswordForm({ user }: { user: IUser }) {
    const { authUser, authToken } = React.useContext(SessionContext);

    const [password, setPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");

    const [errors, setErrors] = React.useState({});

    const [status, setStatus] = React.useState<string | null>(null);

    const [loading, setLoading] = React.useState(false);

    const handleUpdatePassword = () => {
        setStatus(null);

        setErrors({});

        let eval_errors = {};

        if (!password) {
            eval_errors = {
                ...eval_errors,
                password: "La contraseña es requerida",
            };
        }

        if (!newPassword) {
            eval_errors = {
                ...eval_errors,
                new_password: "La nueva contraseña es requerida",
            };
        }

        if (!confirmPassword) {
            eval_errors = {
                ...eval_errors,
                confirm_password: "La confirmación de contraseña es requerida",
            };
        }

        if (newPassword !== confirmPassword && newPassword && confirmPassword) {
            eval_errors = {
                ...eval_errors,
                confirm_password: "Las contraseñas no coinciden",
            };
        }

        if (Object.keys(eval_errors).length > 0) {
            setErrors(eval_errors);
            return;
        }

        setStatus("Actualizando...");

        setLoading(true);
        fetch(APP_DOMAIN + "/api/me/password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
                _method: "PUT",
                password,
                new_password: newPassword,
                confirm_password: confirmPassword,
            }),
        })
            .then(async (response) => {
                setLoading(false);
                let data = await response.json();

                if (!response.ok) {
                    if (data.errors) {
                        setErrors(data.errors);
                    }

                    throw new Error("Error en la petición");
                }

                setStatus("Contraseña actualizada");
                setTimeout(() => setStatus(null), 2000);
                setPassword("");
                setNewPassword("");
                setConfirmPassword("");
            })

            .catch((error) => {
                setLoading(false);
                setErrors({ password: "Contraseña incorrecta" });
                setStatus(null);
                console.error(error);
            });
    };

    return (
        <SectionForm
            title="Cambiar contraseña"
            description="Ingresa tu contraseña actual y la nueva contraseña"
            onSubmit={handleUpdatePassword}
            submitText="Cambiar contraseña"
            status={status}
            loading={loading}
            formFields={() => {
                return (
                    <>
                        <InputText
                            label="Contraseña actual"
                            name="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors["password"] || ""}
                        />
                        <InputText
                            label="Nueva contraseña"
                            name="new_password"
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            error={errors["new_password"] || ""}
                        />
                        <InputText
                            label="Confirmar contraseña"
                            name="confirm_password"
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            error={errors["confirm_password"] || ""}
                        />
                    </>
                );
            }}
        />
    );
}
