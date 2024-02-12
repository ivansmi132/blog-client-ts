import {User} from "../../models/User";
import {Avatar} from "antd";
import React from "react";

export function PostCreatorInfo({user}: {user: User}) {
    return (
        <div className="post-creator-info">

            <p>by</p>

            <Avatar size={26} src={user.picture} />

            <p>{user.name}</p>

        </div>

    )
}