import {Post} from "../models/Post";
import {useAuthContext} from "./useAuthContext";
import {usePaginationContext} from "./usePaginationContext";

export function usePostsAPI() {

    const authContext = useAuthContext();

    const {postsPagination} = usePaginationContext();

    async function getPostById(id: number): Promise<Post> {
        return await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(data => data.json());
    }

    async function addPost(data: Partial<Post>) {
        const postToSend = data;
        postToSend.posted_by = authContext.user!.sub;
        await fetch(`${process.env.REACT_APP_API_URL}/posts`,
            {method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify(postToSend)})
            .then((res) => {
                alert("Post created!");

            })
    }

    async function deletePostById(id: number) {
        await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`,
            {method: "DELETE"})
            .then(() => alert(`success! post ${id} deleted!`));
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

    async function editPost(post : Partial<Post>) {
        await fetch(
            `${process.env.REACT_APP_API_URL}/posts/${post.id}`,
            {method: "PUT", headers: {"content-type": "application/json"},
                body: JSON.stringify(post)}
        );
    }

    return ({getPostById, addPost, deletePostById, fetchAllPosts, editPost});
}
