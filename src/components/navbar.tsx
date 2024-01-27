import {Avatar, Dropdown, Menu, MenuProps} from "antd";
import googleButton from '../assets/google-buttons/png@2x/neutral/web_neutral_rd_ctn@2x.png'
import React from "react";
import {
     TeamOutlined,
    UserOutlined,
    VideoCameraOutlined
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import {auth} from "../models/google-auth-navigation";
import {useAuthContext} from "../hooks/useAuthContext";





export function Navbar() {
    const navigate = useNavigate();
    const authContext = useAuthContext();

    const menuClickHandler: MenuProps['onClick'] = ({key}) => {
        navigate(key);
    }

    const items: MenuProps['items'] = [
        {key: "/", icon: React.createElement(TeamOutlined), label: "Home"},
        {key: "/posts", icon: React.createElement(UserOutlined), label: "Posts"},
        {key: "2", icon: React.createElement(VideoCameraOutlined), label: "Latest"},
        authContext.user && {key: "/admin", icon: React.createElement(TeamOutlined), label: "Admin"}
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
            {!authContext.loading && (<SignIn />)}
        </Header>
    )
}

export function SignIn() {
    const authContext = useAuthContext();

    const items: MenuProps['items'] = [
        {
            label: 'Logout',
            key: '1',
        }
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === "1") {
            authContext.signOut();
        }
    };


    return (
        <>
        {(!authContext.user) ? (
            <button style={{background: 'transparent', border: 'none'}} onClick={() => auth()}>
                <img src={googleButton} alt="google sign in" height="40"/>
            </button>
        ) : (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
            <Dropdown menu={{items, onClick}} trigger={['click']}>
                <a style={{color: "black"}} onClick={(e) => e.preventDefault()}>
                        <p>Welcome, {authContext.user.name}</p>
                </a>
            </Dropdown>
            <Avatar size={50} src={authContext.user!.picture_url}/>
        </div>
        )}
        </>
    )
}
