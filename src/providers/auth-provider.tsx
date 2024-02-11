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

    async function logIn() {

        try {
            const user = await fetch(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                {credentials: "include"}).then(res => res.json());
            setUser(user);

        } catch (error) {
        } finally {
            setCheckingAuthStatus(false);
        }
    }

    async function logOut() {
        try {
            await fetch(
                `${process.env.REACT_APP_API_URL}/auth/logout`,
                {credentials: "include"});
            setUser(null);
            setCheckingAuthStatus(true);
            await logIn();
        } catch (error) {
        }
    }

    const value: AuthContextValue = {user, logOut, checkingAuthStatus, setCheckingAuthStatus};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}