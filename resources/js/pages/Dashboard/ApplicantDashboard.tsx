import React from "react";
import { SessionContext } from "../../ctx";
import { Link } from "react-router-dom";
import { IApplication, IOffer } from "../../interfaces";
import OfferCard from "./OfferCard";
import PrimaryButton from "../../components/PrimaryButton";
import ApplicationCard from "../Applications/ApplicationCard";
import ActivityIndicator from "../../components/ActivityIndicator";
import { APP_DOMAIN } from "../../utils";

export default function ApplicantDashboard() {
    const { authUser, authToken } = React.useContext(SessionContext);

    const [offers, setOffers] = React.useState<IOffer[]>([]);
    const [applications, setApplications] = React.useState<IApplication[]>([]);

    const [loadingOffers, setLoadingOffers] = React.useState<boolean>(true);
    const [loadingApplications, setLoadingApplications] =
        React.useState<boolean>(true);

    React.useEffect(() => {
        if (authToken) {
            fetchOffers();
            fetchApplications();
        }
    }, [authToken]);

    const fetchOffers = async () => {
        setLoadingOffers(true);
        fetch(APP_DOMAIN + "/api/offers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (response) => {
                setLoadingOffers(false);
                let data = await response.json();

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                setOffers(data.data);
            })

            .catch((error) => {
                setLoadingOffers(false);
                console.error(error);
            });
    };

    const fetchApplications = async () => {
        setLoadingApplications(true);
        fetch(APP_DOMAIN + "/api/applications", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (response) => {
                setLoadingApplications(false);
                let data = await response.json();

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                console.log(data.data);

                setApplications(data.data);
            })

            .catch((error) => {
                setLoadingApplications(false);
                console.error(error);
            });
    };

    return (
        <>
            <div className="flex flex-row justify-between items-baseline pb-2 px-4 lg:px-0">
                <h2 className="text-2xl font-bold mb-4">
                    Mis postulaciones{" "}
                    {loadingApplications && <ActivityIndicator />}
                </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 max-h-[80vh] overflow-y-auto">
                {applications.map((application) => {
                    return (
                        <ApplicationCard
                            key={application.id}
                            application={application}
                        />
                    );
                })}
            </ul>

            <div className="flex flex-row justify-between items-baseline pb-2 px-4 lg:px-0">
                <h2 className="text-2xl font-bold my-4">
                    Ofertas disponibles {loadingOffers && <ActivityIndicator />}
                </h2>
            </div>
            <ul className="grid grid-cols-1 gap-4 max-h-[80vh] overflow-y-auto">
                {offers.map((offer) => {
                    // check if the offer is already applied

                    return <OfferCard key={offer.id} offer={offer} />;
                })}
            </ul>
        </>
    );
}
