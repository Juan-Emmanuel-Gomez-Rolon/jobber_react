import React from "react";
import { SessionContext } from "../ctx";
import RecruiterDashboard from "./Dashboard/RecruiterDashboard";
import AppLayout from "../layouts/AppLayout";
import ApplicantDashboard from "./Dashboard/ApplicantDashboard";

export default function Dashboard() {
    const { authUser } = React.useContext(SessionContext);

    return (
        <AppLayout>
            {authUser?.account_type === "recruiter" && <RecruiterDashboard />}
            {authUser?.account_type === "applicant" && <ApplicantDashboard />}
        </AppLayout>
    );
}
