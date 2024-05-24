import React from "react";
import { IApplication } from "../../interfaces";
import { Link } from "react-router-dom";
import { parseApplicationStatus } from "../../utils";
import CategoryTrait from "../../components/CategoryTrait";

export default function ApplicationCard({
    application,
}: {
    application: IApplication;
}) {
    return (
        <Link
            to={`/offers/${application.offer?.id}`}
            className={
                "flex flex-row justify-between p-4 bg-white rounded shadow-md" +
                " " +
                (application.status === "accepted"
                    ? "border-green-500 border-2 hover:bg-green-100"
                    : application.status === "rejected"
                    ? "border-red-500 border-2 hover:bg-red-100"
                    : "border-gray-200 border-2 hover:bg-gray-300")
            }
        >
            <div className="flex flex-col space-y-1 max-w-3xl">
                <h3 className="text-lg font-bold">
                    {application.offer?.title}
                    <CategoryTrait text={application.offer?.category || ""} />
                </h3>
                <p className="text-sm">{application.offer?.title}</p>

                <span className="text-xs font-semibold text-gray-500 ">
                    Publicado por {application.offer?.recruiter?.name}
                </span>
                <span className="text-xs font-semibold text-gray-500 ">
                    Aplicaste el {application.created_at_human}
                </span>
            </div>
            <div className="flex flex-col justify-center items-center  w-full max-w-24">
                <span
                    className={
                        "text-xl font-bold text-center " +
                        (application.status === "accepted"
                            ? "text-green-500"
                            : application.status === "rejected"
                            ? "text-red-500"
                            : "text-gray-500")
                    }
                >
                    {parseApplicationStatus(application.status)}
                </span>
            </div>
        </Link>
    );
}
