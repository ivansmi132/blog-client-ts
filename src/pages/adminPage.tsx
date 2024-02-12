import {useAuthContext} from "../hooks/useAuthContext";
import {UnauthorizedPage} from "./UnauthorizedPage";

export function AdminPage() {

    const authContext = useAuthContext();

    const {isAdmin} = authContext;

    return (
        isAdmin() ?
            <div style={{textAlign: "center"}}>
                <h1>Admin page!</h1>
            </div>
            :
            <UnauthorizedPage />
    )
}