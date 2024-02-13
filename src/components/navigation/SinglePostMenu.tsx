import {FloatButton, notification} from "antd";
import React from "react";
import {useNavigate} from "react-router-dom";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {useAuthContext} from "../../hooks/useAuthContext";
import {Post} from "../../models/Post";

export function SinglePostMenu({currentPost}: {currentPost: Post}) {
    const navigate = useNavigate();
    const {resetToPage1} = usePaginationContext();
    const {deletePostById} = usePostsAPI();
    const context = useAuthContext();

    function isPostCreator() {
        return context.user?.sub === currentPost?.posted_by
    }

    function isAdmin() {
        return context.user?.is_admin
    }

    async function onDelete() {
        try {
            await deletePostById(currentPost.id);
            notification.success({
                duration: 2.5,
                message: "Post Deleted, navigating back to posts!",
                placement: "top",
                onClose: () => {
                    resetToPage1();
                    navigate('/posts');
                }
            })
        } catch {
            navigate('/server_error');
        }

    }

    async function onEdit() {
        navigate('/edit_post', {state: currentPost?.id});
    }

    return (

    <FloatButton.Group shape="circle"
                       className="single-post-floating-menu">

        {(isAdmin() || isPostCreator()) &&
            <FloatButton
                type="primary"
                shape="square"
                description="Edit"
                onClick={onEdit} />
        }

        {isAdmin() &&
            <FloatButton
                type="primary"
                shape="square"
                description="Delete"
                onClick={onDelete} />
        }

    </FloatButton.Group>
    )
}