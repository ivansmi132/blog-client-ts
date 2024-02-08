import {createContext, useEffect, useState} from "react";
import {ContextProviderProps} from "../models/ContextProviderProps";
import {User} from "../models/User";


interface AuthContextValue {
    user: User | null;
    logOut: () => void,
    checkingAuthStatus: boolean,
    setCheckingAuthStatus: CallableFunction
}

export const AuthContext = createContext<AuthContextValue | null>(null);


export function AuthContextProvider({children}: ContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    const [checkingAuthStatus, setCheckingAuthStatus] = useState(true);

    // when the app mounts, we check whether the user is authenticated or not
    useEffect(() => {
        logIn();
    }, [])

    function logIn() {
        fetch(`${process.env.REACT_APP_API_URL}/auth/login`,
            {credentials: "include"})
            .then(data => data.json())
            .then(json => {
                if (!json) {return}
                console.log("user info", json);
                setUser(json);
            })
            .catch((err) =>
            console.log("Error checking authentication status:", (err as Error).message))
            .finally(() => setCheckingAuthStatus(false));
    }

    function logOut() {
        fetch(`${process.env.REACT_APP_API_URL}/auth/logout`,
            {credentials: "include"})
            .then(() => {
                setUser(null);
                setCheckingAuthStatus(true);
                logIn();
            })
    }

    const value: AuthContextValue = {user, logOut, checkingAuthStatus, setCheckingAuthStatus};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}