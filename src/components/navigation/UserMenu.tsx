import {useAuthContext} from "../../hooks/useAuthContext";
import {authGoogle} from "../../utils/authGoogle";
import googleButton from "../../assets/google-buttons/png@2x/neutral/web_neutral_rd_ctn@2x.png";
import React from "react";
import {UserProfileMenu} from "./UserProfileMenu";
import {GoogleOutlined} from "@ant-design/icons";

export function UserMenu() {

    const authContext = useAuthContext();

    return (
        <>
            {!authContext.user ?
                <button className="transparent"
                        onClick={() => authGoogle()}>
                    <img src={googleButton}
                         className="google-button"
                         alt="google sign in"
                         height="40"/>
                    <GoogleOutlined className="small-google-button"
                    />
                </button>
             :
                <UserProfileMenu user={authContext.user} />}
        </>
    )
}
