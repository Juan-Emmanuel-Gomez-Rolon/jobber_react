import React from "react";
import AppLayout from "../../layouts/AppLayout";
import SectionForm from "../../components/SectionForm";
import InputText from "../../components/InputText";
import { IOffer, emptyOffer } from "../../interfaces";
import { SessionContext } from "../../ctx";
import { APP_DOMAIN } from "../../utils";

export default function CreateOffer({
    preFilledOffer = emptyOffer,
}: {
    preFilledOffer?: IOffer;
}) {
    const { authUser, authToken } = React.useContext(SessionContext);
    const [offer, setOffer] = React.useState(preFilledOffer);
    const [status, setStatus] = React.useState<string | null>(null);
    const [errors, setErrors] = React.useState({});

    const handleCreateOffer = () => {
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

        setStatus("Creando oferta...");

        fetch(APP_DOMAIN + "/api/offers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(offer),
        })
            .then(async (response) => {
                let data = await response.json();

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                setStatus("Oferta creada correctamente");

                setTimeout(() => {
                    setStatus(null);
                }, 3000);

                setOffer(emptyOffer);
            })

            .catch((error) => {
                setStatus("Error al crear la oferta");
                console.error(error);
            });
    };

    return (
        <AppLayout>
            <SectionForm
                title="Crear oferta"
                description="Completa los campos para crear una nueva oferta"
                submitText="Crear oferta"
                status={status}
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
                onSubmit={handleCreateOffer}
            />
        </AppLayout>
    );
}
