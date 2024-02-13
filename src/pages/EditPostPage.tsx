import {EditPostForm} from "../components/forms/EditPostForm";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {Post} from "../models/Post";
import { Spin } from "antd";

export function EditPostPage() {

    /*
    the useLocation hook is used to parse the state prop of
    the react-router-dom Link component upon redirects
     */
    let locationData = useLocation();

    const {getPostById} = usePostsAPI();

    const [selectedPost, setSelectedPost] = useState<Post>();

    const navigate = useNavigate();

    useEffect(() => {

        const postId = locationData.state;
        getPostById(postId)
            .then((post) => setSelectedPost(post))
            .catch(() => navigate('/not_found'));
    }, []);

    return (
        selectedPost ?
            <>
                <h1 className="header form-page">Edit Post</h1>
                <EditPostForm selectedPost={selectedPost}/>
            </>
            :
            <div style={{textAlign: "center"}}>
                <Spin/>
            </div>
    );
}