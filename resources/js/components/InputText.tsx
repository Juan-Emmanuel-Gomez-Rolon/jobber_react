import React from "react";

export default function InputText({
    id,
    label,
    name,
    type = "text",
    value,
    required,
    onChange,
    error,
    placeholder,
}: {
    id?: string;
    label: string;
    name: string;
    type?: string;
    value?: string;
    required?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    placeholder?: string;
}) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-start items-center gap-2">
                <label htmlFor={id} className="text-sm" aria-label={label}>
                    {label}
                </label>
                {required && <div className="text-red-500">*</div>}
            </div>
            <input
                id={id}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className={`p-2 border border-gray-300 rounded max-w-md
                 ${error ? "border-red-500" : ""}`}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
