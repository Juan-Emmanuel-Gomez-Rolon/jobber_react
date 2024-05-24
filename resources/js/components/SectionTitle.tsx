import React from "react";

export default function SectionTitle({ children }) {
    return (
        <h2 className="text-2xl font-semibold text-primary-900 mb-4">
            {children}
        </h2>
    );
}
