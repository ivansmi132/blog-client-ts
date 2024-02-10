import {Post} from "../models/Post";
import {useAuthContext} from "./useAuthContext";
import {usePaginationContext} from "./usePaginationContext";

export function usePostsAPI() {

    const authContext = useAuthContext();

    const {postsPagination} = usePaginationContext();

    async function getPostById(id: number): Promise<Post> {
        return await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {credentials: "include"})
            .then(data => data.json());
    }

    async function addPost(formData: FormData) {

        return await fetch(`${process.env.REACT_APP_API_URL}/posts`,
            {method: "POST",
                credentials: "include",
                body: formData})
    }

    async function deletePostById(id: number) {
        return await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`,
            {method: "DELETE",
                credentials: "include"})
    }

    async function fetchAllPosts() {

        const url = `${process.env.REACT_APP_API_URL}/posts` +
        `?page=${postsPagination.currentPage}` +
        `&search=${postsPagination.query}` +
        `&pageSize=${postsPagination.pageSize}`

        return await fetch(
            url,
            {credentials: "include"})
            .then(data => data.json());
    }

    async function editPost(formData: FormData, postId: number) {
        await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${postId}`,
            {method: "PUT",
                credentials: "include",
                body: formData}
        );
    }

    return ({getPostById, addPost, deletePostById, fetchAllPosts, editPost});
}
