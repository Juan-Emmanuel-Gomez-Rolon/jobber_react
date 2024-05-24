import React from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { SessionContext } from "../../ctx";
import { IOffer } from "../../interfaces";
import { parseApplicationStatus } from "../../utils";
import PostulantCard from "./PostulantCard";
import PrimaryButton from "../../components/PrimaryButton";
import CategoryTrait from "../../components/CategoryTrait";
import SectionTitle from "../../components/SectionTitle";
import ActivityIndicator from "../../components/ActivityIndicator";
import { APP_DOMAIN } from "../../utils";

export default function OfferDetails() {
    const { id } = useParams();
    const { authUser, authToken } = React.useContext(SessionContext);

    const [loading, setLoading] = React.useState<boolean>(false);

    const [offer, setOffer] = React.useState<IOffer | null>(null);

    const pendingApplications = offer?.applications?.filter(
        (application) => application.status === "pending"
    );

    const pendingApplicationsCount = pendingApplications?.length || 0;

    const acceptedApplications = offer?.applications?.filter(
        (application) => application.status === "accepted"
    );

    const acceptedApplicationsCount = acceptedApplications?.length || 0;

    const rejectedApplications = offer?.applications?.filter(
        (application) => application.status === "rejected"
    );

    const rejectedApplicationsCount = rejectedApplications?.length || 0;

    React.useEffect(() => {
        if (!authToken) return;

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
                if (
                    data.offer.user_id !== authUser?.id &&
                    authUser?.account_type === "recruiter"
                ) {
                    window.location.href = "/dashboard";
                } else setOffer(data.offer);
            })

            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    const applyToOffer = async () => {
        setLoading(true);
        fetch(`/api/offers/${id}/apply`, {
            method: "POST",
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

                fetchOffer();
            })

            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    if (authUser && authUser.account_type === "applicant") {
        return (
            <AppLayout>
                {offer === null && <p>Cargando...</p>}
                {offer && (
                    <div className="bg-white rounded shadow-md p-6">
                        <div className="flex flex-row justify-between ">
                            <h2 className="text-2xl font-bold mb-4">
                                {offer.title}{" "}
                                <CategoryTrait text={offer.category} />
                            </h2>
                            {loading && <ActivityIndicator />}
                            {!offer.application && (
                                <PrimaryButton
                                    text="Aplicar a la oferta de trabajo"
                                    onClick={applyToOffer}
                                />
                            )}
                            {offer.application &&
                                offer.application.status === "pending" && (
                                    <h2 className="font-bold">
                                        Aplicaste{" "}
                                        {offer.application.created_long_ago}
                                    </h2>
                                )}
                            {offer.application &&
                                offer.application.status === "rejected" && (
                                    <h2 className="font-bold text-red-800">
                                        Rechazado{" "}
                                        {offer.application.updated_long_ago}
                                    </h2>
                                )}
                            {offer.application &&
                                offer.application.status === "accepted" && (
                                    <h2 className="font-bold text-green-800">
                                        Aceptado{" "}
                                        {offer.application.updated_long_ago}
                                    </h2>
                                )}
                        </div>
                        <p className="pb-4 max-w-3xl">{offer.description}</p>
                        <p className="italic text-sm">
                            {offer.applications_count} postulantes
                        </p>
                        <p className="italic text-sm">
                            Creado {offer.created_long_ago} por{" "}
                            {offer.recruiter?.name}
                        </p>
                    </div>
                )}
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            {offer === null && <p>Cargando...</p>}
            {offer && (
                <div className="space-y-4">
                    <div className="bg-white rounded shadow-md p-6">
                        <div className="flex flex-row justify-between ">
                            <h2 className="text-2xl font-bold mb-4">
                                {offer.title}{" "}
                                <CategoryTrait text={offer.category} />
                            </h2>
                            {loading && <ActivityIndicator />}
                            <PrimaryButton
                                text="Editar oferta"
                                to={`/offers/${offer.id}/edit`}
                            />
                        </div>
                        <p className="pb-4 max-w-3xl">{offer.description}</p>
                        <p className="italic text-sm">
                            {offer.applications_count} postulantes
                        </p>
                        <p className="italic text-sm">
                            Creado {offer.created_long_ago} por{" "}
                            {offer.recruiter?.name}
                        </p>
                    </div>
                    <div className="bg-white rounded shadow-md p-6">
                        {pendingApplicationsCount > 0 && (
                            <SectionTitle>Postulantes pendientes</SectionTitle>
                        )}
                        {pendingApplicationsCount === 0 && (
                            <SectionTitle>
                                No hay postulantes pendientes
                            </SectionTitle>
                        )}

                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {offer?.applications?.map((application) => {
                                if (application.status !== "pending") return "";
                                return (
                                    <PostulantCard
                                        application={application}
                                        key={"application_" + application.id}
                                        refresh={fetchOffer}
                                    />
                                );
                            })}
                        </ul>
                    </div>

                    <div className="bg-white rounded shadow-md p-6">
                        {acceptedApplicationsCount > 0 && (
                            <SectionTitle>Postulantes aceptados</SectionTitle>
                        )}
                        {acceptedApplicationsCount === 0 && (
                            <SectionTitle>
                                No hay postulantes aceptados
                            </SectionTitle>
                        )}

                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {offer?.applications?.map((application) => {
                                if (application.status !== "accepted")
                                    return "";
                                return (
                                    <PostulantCard
                                        application={application}
                                        key={"application_" + application.id}
                                        refresh={fetchOffer}
                                    />
                                );
                            })}
                        </ul>
                    </div>

                    <div className="bg-white rounded shadow-md p-6">
                        {rejectedApplicationsCount > 0 && (
                            <SectionTitle>Postulantes rechazados</SectionTitle>
                        )}
                        {rejectedApplicationsCount === 0 && (
                            <SectionTitle>
                                No hay postulantes rechazados
                            </SectionTitle>
                        )}
                        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {offer?.applications?.map((application) => {
                                if (application.status !== "rejected")
                                    return "";
                                return (
                                    <PostulantCard
                                        application={application}
                                        key={"application_" + application.id}
                                        refresh={fetchOffer}
                                    />
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
