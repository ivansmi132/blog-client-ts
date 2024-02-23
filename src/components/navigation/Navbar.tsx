import {Menu, MenuProps} from "antd";
import React from "react";
import {
     TeamOutlined,
    HomeOutlined,
    ReadOutlined
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import {useLocation, useNavigate} from "react-router-dom";
import {useAuthContext} from "../../hooks/useAuthContext";
import {UserMenu} from "./UserMenu";
import '../../styles/navigation.css';



export function Navbar() {

    const location = useLocation();
    const {pathname} = location;

    const navigate = useNavigate();
    const authContext = useAuthContext();

    const items: MenuProps['items'] = [
        {
            key: "/",
            icon: React.createElement(HomeOutlined),
            label: "Home"
        },
        {
            key: "/posts",
            icon: React.createElement(ReadOutlined),
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
                Our Blog
            </h1>

            <Menu
                className='main-navbar-menu'
                theme="light"
                mode="horizontal"
                items={items}
                onClick={menuClickHandler}
                selectedKeys={[pathname]}
            />

            {!authContext.checkingAuthStatus &&
                <UserMenu />
            }

        </Header>
    )
}

