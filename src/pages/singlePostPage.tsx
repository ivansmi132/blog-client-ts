import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Post} from "../models/Post";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {SinglePostMenu} from "../components/posts-components/SinglePostMenu";
import {SinglePostCreatorInfo} from "../components/posts-components/SinglePostCreatorInfo";
import { Spin } from "antd";


export function SinglePostPage() {

    const {id} = useParams();
    const {getPostById} = usePostsAPI();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);

    useEffect(() => {
        getPostById(Number(id))
            .then(post => setCurrentPost(post));
    }, [])

    if (!currentPost) {
        return (
            <div style={{textAlign: "center"}}>
                <Spin />
            </div>

        )
    }

    return (
        <div className={"single-post-body"}>

            <h1 className="header"
                style={{width: "66%", margin: "auto"}}>
                {currentPost?.title}
            </h1>

            {currentPost?.image_url && <img src={currentPost.image_url} alt={'post'}/>}

            <div className="post-content">

                {currentPost && <SinglePostCreatorInfo currentPost={currentPost} />}
                <p style={{whiteSpace: "pre-wrap"}}>
                    {currentPost?.content}
                </p>

            </div>

            {currentPost && <SinglePostMenu currentPost={currentPost}/>}

        </div>
    )
}