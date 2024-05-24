import React from "react";
import { Link, useParams } from "react-router-dom";
import AppLayout from "../../layouts/AppLayout";
import { SessionContext } from "../../ctx";
import { IOffer } from "../../interfaces";
import { APP_DOMAIN } from "../../utils";

export default function OfferDetailManage() {
    const { id } = useParams();
    const { authUser, authToken } = React.useContext(SessionContext);

    const [offer, setOffer] = React.useState<IOffer | null>(null);

    React.useEffect(() => {
        if (authToken) fetchOffer();
    }, [authToken]);

    const fetchOffer = async () => {
        fetch(APP_DOMAIN + "/api/offers/" + id, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(async (response) => {
                let data = await response.json();

                if (!response.ok) {
                    throw new Error("Error en la petición");
                }

                console.log(data);
                setOffer(data.offer);
            })

            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <AppLayout>
            {offer === null && <p>Cargando...</p>}
            {offer && (
                <>
                    <h1>{offer.title}</h1>
                    <p>{offer.description}</p>
                    <p>{offer.applications_count} postulantes</p>
                    <p>Creado {offer.created_long_ago}</p>

                    <h2>Postulantes</h2>
                    <ul>
                        {offer?.applications?.map((application) => (
                            <Link to={`/profile/${application.user?.id}`}>
                                <li>{application.user?.name}</li>
                            </Link>
                        ))}
                    </ul>
                    {JSON.stringify(offer)}
                </>
            )}
        </AppLayout>
    );
}
