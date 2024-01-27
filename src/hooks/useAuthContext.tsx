import {useContext} from "react";
import {AuthContext} from "../providers/auth-provider";

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within AuthContextProvider");
    }
    return context
}
