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
import './navigation.css';



export function Navbar() {

    const navigate = useNavigate();
    const authContext = useAuthContext();

    const items: MenuProps['items'] = [
        {
            key: "/",
            icon: React.createElement(TeamOutlined),
            label: "Home"
        },
        {
            key: "/posts",
            icon: React.createElement(UserOutlined),
            label: "Posts"
        },
        authContext.user?.is_admin ?
            {key: "/admin",
                icon: React.createElement(TeamOutlined),
                label: "Admin"
            } : null,
    ]

    const menuClickHandler: MenuProps['onClick'] = ({key}) => {
        navigate(key);
    }

    return (
        <Header className="main-navbar">

            <h1 className="header main-navbar-name">
                My Blog
            </h1>

            <Menu
                className='main-navbar-menu'
                theme="light"
                mode="horizontal"
                items={items}
                onClick={menuClickHandler}
            />

            {!authContext.checkingAuthStatus &&
                <UserMenu />
            }

        </Header>
    )
}
