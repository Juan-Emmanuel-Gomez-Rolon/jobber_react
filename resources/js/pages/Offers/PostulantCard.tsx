import React from "react";
import { Link } from "react-router-dom";
import { parseApplicationStatus } from "../../utils";
import PrimaryButton from "../../components/PrimaryButton";
import { SessionContext } from "../../ctx";
import SecondaryButton from "../../components/SecondaryButton";
import ActivityIndicator from "../../components/ActivityIndicator";

export default function PostulantCard({ application, refresh = () => {} }) {
    const { authToken } = React.useContext(SessionContext);

    const [loading, setLoading] = React.useState<boolean>(false);

    const handleAccept = async () => {
        setLoading(true);
        const response = await fetch(
            `/api/applications/${application.id}/accept`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        if (response.ok) {
            setLoading(false);
            refresh();
        }
    };

    const handleReject = async () => {
        setLoading(true);
        const response = await fetch(
            `/api/applications/${application.id}/reject`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
            }
        );

        if (response.ok) {
            setLoading(false);
            refresh();
        }
    };

    return (
        <div
            className={
                application.status === "accepted"
                    ? "bg-green-200 block text-primary-900 p-4 rounded shadow"
                    : application.status === "rejected"
                    ? "bg-red-200 block text-primary-900 p-4 rounded shadow"
                    : "bg-gray-200 block text-primary-900 p-4 rounded shadow"
            }
        >
            <Link
                to={`/profile/${application.user?.id}`}
                className="block hover:underline"
            >
                <h3 className="font-bold">{application.user?.name}</h3>
                <h4 className="italic">{application.user?.email}</h4>
            </Link>

            {application.status !== "pending" && (
                <p>
                    {parseApplicationStatus(application.status)}{" "}
                    {application.updated_long_ago}
                </p>
            )}

            {application.status === "pending" && (
                <div className="flex justify-end gap-2 mt-4">
                    {loading && <ActivityIndicator />}
                    <SecondaryButton text="Rechazar" onClick={handleReject} />
                    <PrimaryButton text="Aceptar" onClick={handleAccept} />
                </div>
            )}
        </div>
    );
}
