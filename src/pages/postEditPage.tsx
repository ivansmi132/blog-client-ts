import {EditPostForm} from "../components/forms/EditPostForm";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {Post} from "../models/Post";
import { Spin } from "antd";

export function PostEditPage() {

    /*
    the useLocation hook is used to parse the state prop of the react-router-dom Link component
    upon redirects
     */
    let locationData = useLocation();

    const {getPostById} = usePostsAPI();

    const [selectedPost, setSelectedPost] = useState<Post>();

    useEffect(() => {

        const postId = locationData.state;
        getPostById(postId)
            .then((post) => setSelectedPost(post));

    }, []);


    if (!locationData.state) {
        return <h1>no selected post to edit</h1>
    }

    return (
        selectedPost ?
            <EditPostForm selectedPost={selectedPost} />
                :
            <Spin />
    );
}