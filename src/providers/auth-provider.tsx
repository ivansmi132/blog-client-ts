import {createContext, useEffect, useState} from "react";
import {ContextProviderProps} from "../models/contextProviderProps";
import {User} from "../models/User";


interface UserContextValue {
    user: User | null;
    signOut: () => void,
    loading: boolean,
    setLoading: CallableFunction
}

export const AuthContext = createContext<UserContextValue | null>(null);


export function AuthContextProvider({children}: ContextProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        logIn();
    }, [])

    function logIn() {
        fetch(`${process.env.REACT_APP_API_URL}/login`, {credentials: "include"})
            .then(data => data.json())
            .then(json => {
                if (!json) {return}
                console.log("user info", json);
                setUser({name: json.name, id: 1, picture_url: json.picture_url});
                setLoading(false);
            }).catch(() => setLoading(false));
    }

    function signOut() {
        fetch(`${process.env.REACT_APP_API_URL}/logout`, {credentials: "include"})
            .then(() => {
                setUser(null);
                setLoading(true);
                logIn();
            })
    }

    const value: UserContextValue = {user, signOut, loading, setLoading};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}