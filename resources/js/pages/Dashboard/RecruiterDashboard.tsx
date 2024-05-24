import React from "react";
import { SessionContext } from "../../ctx";
import { Link } from "react-router-dom";
import { IOffer } from "../../interfaces";
import OfferCard from "./OfferCard";
import PrimaryButton from "../../components/PrimaryButton";
import ActivityIndicator from "../../components/ActivityIndicator";
import { APP_DOMAIN } from "../../utils";

export default function RecruiterDashboard() {
    const { authUser, authToken } = React.useContext(SessionContext);

    const [myOffers, setMyOffers] = React.useState<IOffer[]>([]);

    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        if (authUser?.account_type === "recruiter") {
            setLoading(true);
            fetch(APP_DOMAIN + "/api/my_offers", {
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

                    console.log(data);
                    setMyOffers(data.data);
                })

                .catch((error) => {
                    setLoading(false);
                    console.error(error);
                });
        }
    }, [authUser]);

    return (
        <>
            {authUser?.account_type === "recruiter" && (
                <>
                    <div className="flex flex-row justify-between items-baseline pb-2 px-4 lg:px-0">
                        <h2 className="text-2xl font-bold mb-4">Mis ofertas</h2>
                        {loading && <ActivityIndicator />}
                        <PrimaryButton
                            text="Crear oferta"
                            to="/offers/create"
                        />
                    </div>
                    {myOffers && myOffers.length > 0 && (
                        <p className="hidden">loaded</p>
                    )}
                    <ul className="grid grid-cols-1 gap-4">
                        {myOffers.map((offer) => (
                            <OfferCard key={offer.id} offer={offer} />
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}
