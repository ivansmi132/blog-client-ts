import {usePaginationContext} from "./usePaginationContext";

export function usePostsAPI() {

    const {postsPagination} = usePaginationContext();

    async function getPostById(id: number) {

        try {
            const post = await fetch(
                `${process.env.REACT_APP_API_URL}/posts/${id}`,
                {credentials: "include"});
            return post.json();
        } catch {
            throw new Error("Server error");
        }
    }


    async function addPost(formData: FormData) {

        try {
            const post = await fetch(
                `${process.env.REACT_APP_API_URL}/posts`,
                {method: "POST",
                    credentials: "include",
                    body: formData});
            return post.json();
        } catch {
            throw new Error("Server error");
        }
    }


    async function deletePostById(id: number) {

        try {
            return await fetch(
                `${process.env.REACT_APP_API_URL}/posts/${id}`,
                {method: "DELETE",
                    credentials: "include"});
        } catch {
            throw new Error("Server error");
        }
    }


    async function fetchAllPosts() {

        const url = `${process.env.REACT_APP_API_URL}/posts` +
        `?page=${postsPagination.currentPage}` +
        `&search=${postsPagination.query}` +
        `&pageSize=${postsPagination.pageSize}` +
        `&type=${postsPagination.type}`


        try {
            const posts = await fetch(
                url,
                {credentials: "include"});

            return posts.json();
        } catch {
            throw new Error("Server error");
        }
    }


    async function editPost(formData: FormData, postId: number) {

        try {
            await fetch(
                `${process.env.REACT_APP_API_URL}/posts/${postId}`,
                {method: "PUT",
                    credentials: "include",
                    body: formData}
            );
        } catch {
            throw new Error("Server error");
        }
    }

    return ({
        getPostById,
        addPost,
        deletePostById,
        fetchAllPosts,
        editPost
    });
}
