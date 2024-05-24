import React from "react";
import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";

import LoginForm from "../../resources/js/pages/LoginForm";

describe("should render", () => {
    it("should render login form", () => {
        const { unmount } = render(
            <LoginForm onSubmit={() => {}} error={""} />
        );

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Inicio de sesión");

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Iniciar sesión");

        const email = screen.getByLabelText("Correo electrónico");
        expect(email).toHaveAttribute("type", "email");

        const password = screen.getByLabelText("Contraseña");
        expect(password).toHaveAttribute("type", "password");

        unmount();
    });

    it("should call submit", async () => {
        const { rerender, unmount } = render(
            <LoginForm onSubmit={(e) => {}} error={""} />
        );

        expect(screen.queryByText("email obligatorio")).not.toBeInTheDocument();

        const button = screen.getByRole("button");
        const user = userEvent.setup();

        await user.click(button);

        rerender(
            <LoginForm onSubmit={(e) => {}} error={"email obligatorio"} />
        );

        expect(screen.getByText("email obligatorio")).toBeInTheDocument();

        unmount();
    });

    it("should fill form", async () => {
        const { unmount } = render(
            <LoginForm
                onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const data = Object.fromEntries(formData.entries());
                    console.log("asserting data", data);
                    expect(data).toEqual({
                        email: "test@example.com",
                        password: "password",
                    });
                }}
                error={""}
            />
        );

        const email = screen.getByLabelText("Correo electrónico");
        const password = screen.getByLabelText("Contraseña");
        const submitButton = screen.getByRole("button");

        await userEvent.type(email, "test@example.com");
        await userEvent.type(password, "password");

        await userEvent.click(submitButton);

        expect(email).toHaveValue("test@example.com");
        expect(password).toHaveValue("password");

        unmount();
    });
});
