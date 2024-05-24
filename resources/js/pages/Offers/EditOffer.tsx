import React from "react";
import AppLayout from "../../layouts/AppLayout";
import SectionForm from "../../components/SectionForm";
import InputText from "../../components/InputText";
import { emptyOffer } from "../../interfaces";
import { SessionContext } from "../../ctx";
import { useParams } from "react-router";
import { APP_DOMAIN } from "../../utils";

export default function EditOffer() {
    const { id } = useParams();
    const { authUser, authToken } = React.useContext(SessionContext);
    const [offer, setOffer] = React.useState(emptyOffer);
    const [status, setStatus] = React.useState<string | null>(null);
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!authToken) return;

        // if auth user is not recruter, redirect to dashboard
        if (authUser?.account_type !== "recruiter") {
            window.location.href = "/dashboard";
        }

        fetchOffer();
    }, [authToken]);

    const fetchOffer = async () => {
        setLoading(true);
        fetch(APP_DOMAIN + "/api/offers/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (response) => {
                setLoading(false);
                let data = await response.json();

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                // if offer user_id is different from authUser.id, redirect to dashboard
                if (data.offer.user_id !== authUser?.id) {
                    window.location.href = "/dashboard";
                } else setOffer(data.offer);
            })

            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    const handleUpdateOffer = () => {
        setStatus(null);
        setErrors({});

        let eval_errors = {};

        if (!offer.title) {
            eval_errors = { ...eval_errors, title: "El título es requerido" };
        }

        if (!offer.description) {
            eval_errors = {
                ...eval_errors,
                description: "La descripción es requerida",
            };
        }

        if (!offer.category) {
            eval_errors = {
                ...eval_errors,
                category: "La categoría es requerida",
            };
        }

        if (Object.keys(eval_errors).length > 0) {
            setErrors(eval_errors);
            setStatus("Verifica los campos");
            return;
        }

        setStatus("Actualizando oferta...");

        setLoading(true);
        fetch(APP_DOMAIN + "/api/offers/" + id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ _method: "PUT", ...offer }),
        })
            .then(async (response) => {
                setLoading(false);
                let data = await response.json();

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                setStatus("Oferta actualizada correctamente");

                setTimeout(() => {
                    setStatus(null);
                }, 3000);
            })

            .catch((error) => {
                setLoading(false);
                setStatus("Error al actualizar la oferta");
                console.error(error);
            });
    };

    return (
        <AppLayout>
            <SectionForm
                title="Editar oferta"
                description="Modifica los campos de tu oferta."
                submitText="Editar oferta"
                status={status}
                loading={loading}
                formFields={() => (
                    <>
                        <InputText
                            label="Título"
                            name="title"
                            required
                            value={offer.title}
                            onChange={(e) =>
                                setOffer({
                                    ...offer,
                                    title: e.target.value,
                                })
                            }
                            error={errors["title"] ?? undefined}
                        />
                        <InputText
                            label="Descripción"
                            name="description"
                            required
                            value={offer.description}
                            onChange={(e) =>
                                setOffer({
                                    ...offer,
                                    description: e.target.value,
                                })
                            }
                            error={errors["description"] ?? undefined}
                        />

                        <InputText
                            label="Categoría"
                            name="category"
                            required
                            value={offer.category}
                            onChange={(e) =>
                                setOffer({
                                    ...offer,
                                    category: e.target.value,
                                })
                            }
                            error={errors["category"] ?? undefined}
                        />
                    </>
                )}
                onSubmit={handleUpdateOffer}
            />
        </AppLayout>
    );
}
