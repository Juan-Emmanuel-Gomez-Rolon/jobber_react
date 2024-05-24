import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import Dashboard from "../../resources/js/pages/Dashboard";
import { BrowserRouter as Router } from "react-router-dom";

import { SessionContextProvider } from "../../resources/js/ctx";

describe("should render", () => {
    it("should fetch data from dashboard", async () => {
        window.sessionStorage.setItem(
            "session",
            `{"authUser":{"id":1,"name":"Mr. Domenico Sawayn II","email":"recruiter@example.com","phone":"+13175984647","description":"Qui corrupti velit repellat nesciunt officia perspiciatis.","account_type":"recruiter","email_verified_at":"2024-05-20T06:18:20.000000Z","created_at":"2024-05-20T06:18:21.000000Z","updated_at":"2024-05-20T06:18:21.000000Z","created_at_human":"20/05/2024 00:18:21","created_long_ago":"hace 10 horas","updated_at_human":"20/05/2024 00:18:21","updated_long_ago":"hace 10 horas"},"authToken":"7|cOi1pKhIrrpcUNbikKkHtI12ooNO8SrgAXYMgZzFe710c81c"}`
        );
        const { unmount } = render(
            <Router>
                <SessionContextProvider>
                    <Dashboard />
                </SessionContextProvider>
            </Router>
        );

        await waitFor(
            () => {
                expect(screen.getByText("loaded")).toBeInTheDocument();
            },
            {
                timeout: 10000,
            }
        );
    });
});
