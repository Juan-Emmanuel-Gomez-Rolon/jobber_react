import React from "react";
import AppHeader from "../components/AppHeader";

export default function AppLayout({ children }: React.PropsWithChildren<{}>) {
    return (
        <div className="bg-gray-100 min-h-screen">
            <AppHeader />
            <div
                id="main-content"
                className="container mx-auto py-4 max-w-6xl  text-primary-900 "
            >
                {children}
            </div>
        </div>
    );
}
