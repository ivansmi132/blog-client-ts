import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Post} from "../models/Post";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {Avatar, FloatButton} from "antd";
import {useAuthContext} from "../hooks/useAuthContext";
import {usePaginationContext} from "../hooks/usePaginationContext";
import {PostDate} from "../components/PostDate";


export function SinglePostPage() {
    const navigate = useNavigate();
    const {id} = useParams();
    const {getPostById, deletePostById} = usePostsAPI();
    const [currentPost, setCurrentPost] = useState<Post | null>(null);
    const context = useAuthContext();
    const {setPostsPagination} = usePaginationContext();


    function isPostCreator() {
        return context.user?.sub === currentPost?.posted_by
    }

    function isAdmin() {
        return context.user?.is_admin
    }


    useEffect(() => {
        getPostById(Number(id)).then(post => {setCurrentPost(post);});
    }, [])

    return (
        <div className={"single-post-body"}>
            <h1 className="header" style={{width: "66%", margin: "auto"}}>{currentPost?.title}</h1>
            {currentPost?.image_url && <img src={currentPost.image_url} alt={'post'}/>}

            <div className="post-content">
                <div style={{
                    justifyContent: "start",
                    alignItems: "center",
                    display: "flex",
                    gap: "10px",
                    position: "relative",
                    padding: "3px",
                    borderRadius: "12px",
                    color: "gray",
                    marginBottom: "1%"
                }}>
                    <div style={{display: "flex", gap: "7px"}}>
                        <p>by {currentPost?.user.name}</p>
                        <Avatar style={{display: "inline-flex"}} size={26} src={currentPost?.user.picture}/>
                    </div>
                    <PostDate className={"single-post-date"} date={currentPost?.creation_date!}/>
                </div>
                <p style={{whiteSpace: "pre-wrap"}}>{currentPost?.content}</p>
            </div>


            {
                    <FloatButton.Group shape="circle" style={{right: 24}}>
                        {(isAdmin() || isPostCreator()) &&
                            <FloatButton type="primary" shape="square" description="edit"
                                     onClick={() => navigate('/edit_post', {state: currentPost?.id})}/>
                        }
                        {isAdmin() && <FloatButton type="primary" shape="square" description="delete"
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
                        }
                    </FloatButton.Group>

            }

        </div>
    )
}