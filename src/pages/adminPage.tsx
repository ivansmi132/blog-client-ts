import { Button } from "antd";
import {Link, Outlet } from "react-router-dom";

export function AdminPage() {
    return (
        <div style={{textAlign: "center"}}>
            <h1>Admin page!</h1>
            <Button><Link to={'/admin/create_post'}>Create a post</Link></Button>
            <Outlet />
        </div>
    )

}