import React from "react";
import PrimaryButton from "./PrimaryButton";
import ActivityIndicator from "./ActivityIndicator";

export default function SectionForm({
    id = "section-form",
    title,
    description,
    formFields,
    onSubmit,
    status,
    submitText,
    loading = false,
}: {
    id?: string;
    title: string;
    description?: string;
    formFields: () => JSX.Element;
    onSubmit: () => void;
    status?: string | null;
    submitText: string;
    loading?: boolean;
}) {
    return (
        <section className="flex flex-col lg:flex-row justify-between">
            <div className="flex p-4 flex-col items-start">
                <h2 className="text-lg font-bold">{title}</h2>
                {description && <p className="text-sm italic">{description}</p>}
            </div>
            <form
                id={id}
                data-testid={id}
                onSubmit={onSubmit}
                className="w-full bg-white rounded shadow-md lg:max-w-3xl "
            >
                <div className="flex flex-col w-full p-5 space-y-4">
                    {formFields()}
                </div>
                <div className="flex justify-end items-center p-4 gap-4 bg-gray-100">
                    {status && (
                        <p className="text-sm text-gray-500">{status}</p>
                    )}
                    {loading && <ActivityIndicator />}
                    <PrimaryButton text={submitText} onClick={onSubmit} />
                </div>
            </form>
        </section>
    );
}
