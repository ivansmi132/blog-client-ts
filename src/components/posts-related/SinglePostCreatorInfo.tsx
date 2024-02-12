import {Avatar} from "antd";
import {PostDate} from "./PostDate";
import React from "react";
import {Post} from "../../models/Post";

export function SinglePostCreatorInfo({currentPost}: {currentPost: Post}) {

    return (
        <div className="single-post-creator">

            <div style={{display: "flex", gap: "7px"}}>

                <p>by {currentPost?.user.name}</p>
                <Avatar style={{display: "inline-flex"}}
                        size={26}
                        src={currentPost?.user.picture}/>

            </div>

            <PostDate className={"single-post-date"}
                      date={currentPost?.creation_date!}/>
        </div>
    )
}