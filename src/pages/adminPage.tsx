import { Outlet } from "react-router-dom";

export function AdminPage() {
    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin page!</h1>
            <Outlet />
        </div>
    )

}