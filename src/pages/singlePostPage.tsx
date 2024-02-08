import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Post} from "../models/Post";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {FloatButton} from "antd";
import {useAuthContext} from "../hooks/useAuthContext";
import {usePaginationContext} from "../hooks/usePaginationContext";


export function SinglePostPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {getPostById, deletePostById} = usePostsAPI();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const context = useAuthContext();
    const {setPostsPagination} = usePaginationContext();


    function hasEditPrivilege() {
        return context.user?.is_admin || (context.user?.sub === currentPost?.posted_by)
    }


    useEffect(() => {
        getPostById(Number(id)).then(post => {setCurrentPost(post);});
    }, [])

    return (
                <div className={"single-post-body"}>
                    <h1>{currentPost?.title}</h1>
                    {currentPost?.image_url && <img src={currentPost.image_url} alt={'post'}/>}
                    <p>{currentPost?.content}</p>

                    {
                        hasEditPrivilege() && (
                            <FloatButton.Group shape="circle" style={{ right: 24 }}>
                                <FloatButton type="primary" shape="square" description="edit"
                                    onClick={() => navigate('/edit_post', {state: currentPost?.id})}/>
                                <FloatButton type="primary" shape="square" description="delete"
                                             onClick={() => {
                                                 deletePostById(Number(id))
                                                     .then(() => {
                                                         setPostsPagination((prev) => {
                                                             return {
                                                                 ...prev,
                                                                 currentPage: 1
                                                             }
                                                         })
                                                         navigate('/posts');
                                                     });
                                             }}/>
                                <FloatButton.BackTop visibilityHeight={0} />
                            </FloatButton.Group>

                        )
                    }

                </div>
    )
}