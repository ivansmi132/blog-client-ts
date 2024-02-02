import {useAuthContext} from "../../hooks/useAuthContext";
import {Avatar, Dropdown, MenuProps} from "antd";
import {authGoogle} from "../../models/authGoogle";
import googleButton from "../../assets/google-buttons/png@2x/neutral/web_neutral_rd_ctn@2x.png";
import React from "react";

export function UserMenu() {
    const authContext = useAuthContext();

    const items: MenuProps['items'] = [
        {
            label: 'Logout',
            key: '1',
        }
    ];

    const onClick: MenuProps['onClick'] = ({ key }) => {
        if (key === "1") {
            authContext.logOut();
        }
    };


    return (
        <>
            {(!authContext.user) ? (
                <button style={{background: 'transparent', border: 'none'}} onClick={() => authGoogle()}>
                    <img src={googleButton} alt="google sign in" height="40"/>
                </button>
            ) : (
                <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                    <Dropdown menu={{items, onClick}} trigger={['click']}>
                        <a style={{color: "black"}} onClick={(e) => e.preventDefault()}>
                            <p>Welcome, {authContext.user.name}</p>
                        </a>
                    </Dropdown>
                    <Avatar size={50} src={authContext.user!.picture}/>
                </div>
            )}
        </>
    )
}