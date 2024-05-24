import React from "react";
import { Link } from "react-router-dom";

export default function DangerButton({
    text,
    type = "button",
    onClick,
    to,
}: {
    text: string;
    type?: "button" | "submit";
    onClick?: () => void;
    to?: string;
}) {
    if (to) {
        return (
            <Link
                to={to}
                className="bg-secondary-800 hover:bg-secondary-900 text-white font-bold py-2 px-4 rounded"
            >
                {text}
            </Link>
        );
    }

    return (
        <>
            <button
                type={type}
                className="bg-secondary-800 hover:bg-secondary-900 text-white font-bold py-2 px-4 rounded"
                onClick={onClick}
            >
                {text}
            </button>
        </>
    );
}
