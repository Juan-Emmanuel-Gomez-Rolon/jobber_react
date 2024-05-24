import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import CreateOffer from "../../resources/js/pages/Offers/CreateOffer";
import { SessionContextProvider } from "../../resources/js/ctx";
import { emptyOffer, emptyUser } from "../../resources/js/interfaces";
import OfferCard from "../../resources/js/pages/Dashboard/OfferCard";

describe("should render", () => {
    it("should render important element", async () => {
        window.sessionStorage.setItem(
            "session",
            `{"authUser":{"id":1,"name":"Mr. Domenico Sawayn II","email":"recruiter@example.com","phone":"+13175984647","description":"Qui corrupti velit repellat nesciunt officia perspiciatis.","account_type":"recruiter","email_verified_at":"2024-05-20T06:18:20.000000Z","created_at":"2024-05-20T06:18:21.000000Z","updated_at":"2024-05-20T06:18:21.000000Z","created_at_human":"20/05/2024 00:18:21","created_long_ago":"hace 10 horas","updated_at_human":"20/05/2024 00:18:21","updated_long_ago":"hace 10 horas"},"authToken":"7|cOi1pKhIrrpcUNbikKkHtI12ooNO8SrgAXYMgZzFe710c81c"}`
        );

        const offer = emptyOffer;
        offer.title = "Desarrollador web";
        offer.description = "Desarrolladores chidos";
        offer.category = "Web development";
        offer.applications_count = 17;
        offer.recruiter = emptyUser;
        offer.recruiter.name = "Mr. Domenico Sawayn II";

        const { unmount } = render(
            <Router>
                <SessionContextProvider>
                    <OfferCard offer={offer} />
                </SessionContextProvider>
            </Router>
        );

        const title = screen.getByText("Desarrollador web");
        expect(title).toBeInTheDocument();

        const description = screen.getByText("Desarrolladores chidos");
        expect(description).toBeInTheDocument();

        const category = screen.getByText("Web development");
        expect(category).toBeInTheDocument();

        screen.debug();
    });
});
