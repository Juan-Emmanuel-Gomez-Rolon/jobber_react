import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import Title from "../../resources/js/pages/Dashboard/Title";
import "@testing-library/jest-dom/vitest";

describe("should render", () => {
    it("should render", () => {
        const { getByText } = render(<Title />);

        expect(getByText("Title")).toBeInTheDocument();
    });
});
