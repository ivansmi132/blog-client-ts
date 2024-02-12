import {useAuthContext} from "../hooks/useAuthContext";
import {UnauthorizedPage} from "./error-pages/UnauthorizedPage";

export function AdminPage() {

    const authContext = useAuthContext();

    const {isAdmin} = authContext;

    return (
        isAdmin() ?
            <div style={{textAlign: "center"}}>
                <h1 className="header">Admin</h1>
                <ul>
                    <li>You can edit all posts</li>
                    <li>You can delete posts</li>
                </ul>
            </div>
            :
            <UnauthorizedPage />
    )
}