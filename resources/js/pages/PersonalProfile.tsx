import React from "react";
import { SessionContext } from "../ctx";
import AppLayout from "../layouts/AppLayout";
import { IUser } from "../interfaces";
import UpdatePasswordForm from "./PersonalProfile/UpdatePasswordForm";
import UpdatePersonalDataForm from "./PersonalProfile/UpdatePersonalDataForm";
import { APP_DOMAIN } from "../utils";
import ActivityIndicator from "../components/ActivityIndicator";

export default function PersonalProfile() {
    const { authUser, authToken } = React.useContext(SessionContext);

    const [user, setUser] = React.useState<IUser | null>(null);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!authToken) return;

        refreshUser();
    }, [authUser, authToken]);

    const refreshUser = () => {
        setLoading(true);
        fetch(APP_DOMAIN + "/api/me", {
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

                if (data.user) setUser(data.user);
            })

            .catch((error) => {
                setLoading(false);
                console.error(error);
            });
    };

    return (
        <AppLayout>
            {loading && <ActivityIndicator />}
            {user && (
                <div className="flex flex-col space-y-8">
                    <UpdatePersonalDataForm user={user} setUser={setUser} />
                    <UpdatePasswordForm user={user} />
                </div>
            )}
        </AppLayout>
    );
}
