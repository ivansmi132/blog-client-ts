import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Post} from "../models/Post";
import {usePostsAPI} from "../models/usePostsAPI";
import {FloatButton} from "antd";


export function SinglePostPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {getPostById} = usePostsAPI();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);


    useEffect(() => {
        getPostById(Number(id)).then(post => {setCurrentPost(post);});
    }, [])

    return (
                <div className={"single-post-body"}>
                    <h1>{currentPost?.title}</h1>
                    {currentPost?.image_url && <img src={currentPost.image_url} alt={'post'}/>}
                    <p>{currentPost?.content}</p>

                    <FloatButton type="primary" shape="square" description="edit"
                                 onClick={() => navigate('/admin/edit_post', {state: currentPost?.id})}/>
                </div>
    )
}