import {User} from "../../models/User";
import {Avatar} from "antd";
import React from "react";

export function PostCreatorInfo({user}: {user: User}) {
    return (
        <div style={{display: "flex", flexDirection: "row", alignContent: "center", gap: "5px"}}>
            <div style={{display: "flex", alignItems: "center"}}>
                <p style={{fontSize: "10px"}}>by</p>
            </div>

            <Avatar size={26} src={user.picture} />
            <p>{user.name}</p>
        </div>

    )
}