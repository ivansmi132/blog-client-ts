import {useAuthContext} from "../hooks/useAuthContext";

export function AdminPage() {
    const authContext = useAuthContext();

    if (!authContext.user?.is_admin) {
        return (<h1>Access restricted to administrator only!</h1>)
    }
    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin page!</h1>
        </div>
    )

}