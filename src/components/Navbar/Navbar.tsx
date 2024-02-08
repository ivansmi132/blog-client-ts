import {Menu, MenuProps} from "antd";
import React from "react";
import {
     TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext";
import {UserMenu} from "./UserMenu";



export function Navbar() {
    const navigate = useNavigate();
    const authContext = useAuthContext();

    const menuClickHandler: MenuProps['onClick'] = ({key}) => {
        navigate(key);
    }

    const items: MenuProps['items'] = [
        {key: "/", icon: React.createElement(TeamOutlined), label: "Home"},
        {key: "/posts", icon: React.createElement(UserOutlined), label: "Posts"},
        authContext.user?.is_admin ? {key: "/admin", icon: React.createElement(TeamOutlined), label: "Admin"} : null,
    ]

    return (
        <Header
            style={{display: 'flex', alignItems: 'center', justifyContent: "space-evenly", backgroundColor: "#A3D9FF"}}>
            <h1 className="header" style={{textAlign: 'center', fontSize: 40, paddingBottom: "8px"}}>My Blog</h1>
            <Menu
                onClick={menuClickHandler}
                theme="light"
                mode="horizontal"
                items={items}
                style={{flex: 1, minWidth: 0, backgroundColor: "#A3D9FF", display: 'flex', justifyContent: 'center'}}
            />
            {!authContext.checkingAuthStatus && (<UserMenu />)}
        </Header>
    )
}

