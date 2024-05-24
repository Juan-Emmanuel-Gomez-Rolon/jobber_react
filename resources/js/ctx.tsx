import React, { createContext, useState, useEffect } from "react";
import { IUser } from "./interfaces";

interface SessionContextType {
    isLoggedIn: boolean;
    authUser: IUser | null;
    authToken: string;
    setAuthUser: (user: IUser) => void;
    setAuthToken: (token: string) => void;
    logout: () => void;
    saveSession: (params: { user?: IUser; authToken?: string }) => void;
}

export const SessionContext = createContext<SessionContextType>({
    isLoggedIn: false,
    authUser: null,
    authToken: "",
    setAuthUser: () => {},
    setAuthToken: () => {},
    logout: () => {},
    saveSession: () => {},
});

export const SessionContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState<IUser | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        console.log("<SessionContextProvider> reading session from storage");
        const storedSession = sessionStorage.getItem("session");
        if (storedSession) {
            const session = JSON.parse(storedSession);
            setAuthUser(session.authUser);
            setAuthToken(session.authToken);
            setIsLoggedIn(true);
        }
    }, []);

    const saveSession = (params) => {
        console.log("<SessionContextProvider> saveSession", params);
        sessionStorage.setItem(
            "session",
            JSON.stringify({
                authUser: params.user || authUser,
                authToken: params.authToken || authToken,
            })
        );
    };

    const logout = () => {
        setAuthToken("");
        setAuthUser(null);
        sessionStorage.removeItem("session");
    };

    const value = {
        authUser,
        isLoggedIn,
        setAuthUser,
        authToken,
        setAuthToken,
        logout,
        saveSession,
    };

    return (
        <SessionContext.Provider value={value as any}>
            {children}
        </SessionContext.Provider>
    );
};
