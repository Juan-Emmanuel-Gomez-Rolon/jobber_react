import React from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../interfaces";
import AppLayout from "../layouts/AppLayout";
import { SessionContext } from "../ctx";
import { parseAccountType } from "../utils";
import { APP_DOMAIN } from "../utils";

export default function Profile() {
    const { id } = useParams();
    const { authUser, authToken } = React.useContext(SessionContext);

    const [user, setUser] = React.useState<IUser | null>(null);

    React.useEffect(() => {
        fetch(APP_DOMAIN + "/api/profile/" + id, {
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
                setUser(data.user);
            })

            .catch((error) => {
                console.error(error);
            });
    }, [authUser]);

    return (
        <AppLayout>
            {user === null && <p>Cargando... {id}</p>}
            {user && (
                <>
                    <h1 className="text-2xl font-bold mb-4">
                        {user.name}
                        {user.account_type === "recruiter"
                            ? " - " + parseAccountType(user.account_type)
                            : ""}
                    </h1>
                    <span className="text-gray-500">{user.email}</span> -{" "}
                    <span className="text-gray-500">
                        {user.phone ?? "Sin número de teléfono"}
                    </span>
                    <p className="mt-4">{user.description}</p>
                </>
            )}
        </AppLayout>
    );
}
