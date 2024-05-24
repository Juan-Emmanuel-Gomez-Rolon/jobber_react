import React from "react";
import SectionForm from "../../components/SectionForm";
import InputText from "../../components/InputText";
import { IUser } from "../../interfaces";
import { parseAccountType } from "../../utils";
import { SessionContext } from "../../ctx";
import { APP_DOMAIN } from "../../utils";

export default function UpdatePersonalDataForm({
    user,
    setUser,
}: {
    user: IUser;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}) {
    const { authUser, authToken } = React.useContext(SessionContext);

    const [errors, setErrors] = React.useState({});

    const [status, setStatus] = React.useState<string | null>(null);

    const [loading, setLoading] = React.useState(false);

    const handleUpdate = () => {
        setStatus(null);

        setErrors({});

        let eval_errors = {};

        if (!user?.name) {
            eval_errors = { ...eval_errors, name: "El nombre es requerido" };
        }

        if (!user?.email) {
            eval_errors = { ...eval_errors, email: "El email es requerido" };
        }

        // validate email
        if (user?.email && !/\S+@\S+\.\S+/.test(user.email)) {
            eval_errors = { ...eval_errors, email: "Email inválido" };
        }

        if (Object.keys(eval_errors).length > 0) {
            setErrors(eval_errors);
            return;
        }

        setStatus("Actualizando...");

        setLoading(true);
        fetch(APP_DOMAIN + "/api/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ _method: "PUT", ...user }),
        })
            .then(async (response) => {
                setLoading(false);
                let data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message);
                }

                setStatus("Datos actualizados");
                setTimeout(() => setStatus(null), 2000);
            })

            .catch((error) => {
                setLoading(false);
                setStatus("Error al actualizar datos");
                console.error(error);
            });
    };
    return (
        <SectionForm
            title="Mi perfil"
            description="Actualiza tus datos"
            onSubmit={handleUpdate}
            submitText="Actualizar"
            status={status}
            loading={loading}
            formFields={() => {
                return (
                    <>
                        <h2 className="text-sm">
                            Tipo de cuenta:{" "}
                            <span className="font-bold">
                                {parseAccountType(user.account_type)}
                            </span>
                            <span className="text-gray-500">
                                {" "}
                                (No se puede cambiar)
                            </span>
                        </h2>
                        <InputText
                            label="Nombre"
                            name="name"
                            required
                            value={user.name}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    name: e.target.value,
                                })
                            }
                            error={errors["name"] ?? undefined}
                        />
                        <InputText
                            label="Email"
                            name="email"
                            required
                            value={user.email}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    email: e.target.value,
                                })
                            }
                            error={errors["email"] ?? undefined}
                        />
                        <InputText
                            label="Teléfono"
                            name="phone"
                            value={user.phone ?? ""}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    phone: e.target.value,
                                })
                            }
                            error={errors["phone"] ?? undefined}
                        />
                        <InputText
                            label="Descripción"
                            name="description"
                            value={user.description ?? ""}
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    description: e.target.value,
                                })
                            }
                            error={errors["description"] ?? undefined}
                        />
                    </>
                );
            }}
        />
    );
}
