import {useParams} from "react-router-dom";
import {useBlogPostsContext} from "../hooks/useBlogPostsContext";
import {useEffect, useState} from "react";
import {Post} from "../models/Post";


export function SinglePostPage() {
    const {id} = useParams();
    const blogPostsContext = useBlogPostsContext();
    const {getPostById} = blogPostsContext;
    const [currentPost, setCurrentPost] = useState<Post | null>(null);


    useEffect(() => {
        getPostById(Number(id)).then(post => {setCurrentPost(post);});
    }, [])

    return (
                <div className={"single-post-body"}>
                    <h1>{currentPost?.title}</h1>
                    {currentPost?.image_url && <img src={currentPost.image_url} alt={'post'}/>}
                    <p>{currentPost?.content}</p>
                </div>
    )
}