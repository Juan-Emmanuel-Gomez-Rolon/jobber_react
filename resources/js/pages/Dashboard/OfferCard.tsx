import React from "react";
import { IOffer } from "../../interfaces";
import { Link } from "react-router-dom";
import CategoryTrait from "../../components/CategoryTrait";

export default function OfferCard({ offer }: { offer: IOffer }) {
    return (
        <Link
            to={`/offers/${offer.id}`}
            className={
                "flex flex-row justify-between p-4 bg-white hover:bg-primary-300 rounded shadow-md" +
                (offer.is_applied ? " border-l-4 border-primary-500" : "")
            }
        >
            <div className="flex flex-col space-y-1 max-w-3xl">
                <h3 className="text-lg font-bold">
                    {offer.is_applied && (
                        <span className="bg-primary-500 text-white text-xs font-semibold px-2 py-1 rounded-full inline-block mr-2">
                            Ya aplicaste
                        </span>
                    )}
                    {offer.title}
                    <CategoryTrait text={offer.category} />
                </h3>
                <p className="text-sm">{offer.description}</p>

                <span className="text-xs font-semibold text-gray-500 ">
                    Publicado por {offer.recruiter?.name}
                </span>
                <span className="text-xs font-semibold text-gray-500 ">
                    Publicado el {offer.created_at_human}
                </span>
            </div>
            <div className="flex flex-col justify-center items-center  w-full max-w-24">
                <span className="text-xl font-bold text-center">
                    {offer.applications_count}
                </span>
                <span className="">
                    Postulante
                    {(offer.applications_count > 1 ||
                        offer.applications_count == 0) &&
                        "s"}
                </span>
            </div>
        </Link>
    );
}
