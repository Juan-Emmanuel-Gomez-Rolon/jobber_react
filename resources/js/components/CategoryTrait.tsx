import React from "react";

export default function CategoryTrait({ text }: { text: string }) {
    return (
        <span className="bg-primary-200 text-primary-800 text-xs font-semibold px-2 py-1 rounded-full inline-block ml-2">
            {text}
        </span>
    );
}
