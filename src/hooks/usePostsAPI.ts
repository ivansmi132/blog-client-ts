import {Post} from "../models/Post";
import {usePaginationContext} from "./usePaginationContext";
import {useNavigate} from "react-router-dom";

export function usePostsAPI() {

    const {postsPagination} = usePaginationContext();
    const navigate = useNavigate();

    async function getPostById(id: number): Promise<Post> {

        const post = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${id}`,
            {credentials: "include"});
        if (!post.ok) {
            navigate('/not_found');
        }
        return post.json();
    }


    async function addPost(formData: FormData) {

        const post = await fetch(
            `${process.env.REACT_APP_API_URL}/posts`,
            {method: "POST",
                credentials: "include",
                body: formData});

        if (post.status !== 201) {
            navigate('/server_error');
        }

        return post.json();
    }


    async function deletePostById(id: number) {

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${id}`,
            {method: "DELETE",
                credentials: "include"});
        if (!result.ok) {
            navigate('/server_error');
        }
        return result
    }


    async function fetchAllPosts() {

        const url = `${process.env.REACT_APP_API_URL}/posts` +
        `?page=${postsPagination.currentPage}` +
        `&search=${postsPagination.query}` +
        `&pageSize=${postsPagination.pageSize}`

        const posts = await fetch(
            url,
            {credentials: "include"});

        if (!posts.ok) {
            navigate('/server_error');
        }

        return posts.json();
    }


    async function editPost(formData: FormData, postId: number) {

        const result = await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${postId}`,
            {method: "PUT",
                credentials: "include",
                body: formData}
        );
        if (!result.ok) {
            navigate('/server_error');
        }
    }


    return ({
        getPostById,
        addPost, deletePostById,
        fetchAllPosts,
        editPost
    });
}
