import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Post} from "../models/Post";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {SinglePostMenu} from "../components/navigation/SinglePostMenu";
import {SinglePostCreatorInfo} from "../components/posts-related/SinglePostCreatorInfo";
import { Spin } from "antd";

export function SinglePostPage() {

    const {id} = useParams();
    const {getPostById} = usePostsAPI();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        getPostById(Number(id))
            .then(post => setCurrentPost(post))
            .catch(() => navigate('/not_found'));
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

            <div className="single-post-heading-container">

                <h1 className="header single-post-page-title">
                    {currentPost.title}
                </h1>

                {currentPost.image_url &&
                    <img src={currentPost.image_url} alt={""}/>
                }
            </div>

            <div className="post-content">
                <SinglePostCreatorInfo currentPost={currentPost} />
                <p>{currentPost.content}</p>
            </div>

            <SinglePostMenu currentPost={currentPost}/>

        </div>
    )
}