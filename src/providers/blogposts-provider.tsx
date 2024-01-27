import {createContext, Dispatch, SetStateAction, useState} from "react";
import {ContextProviderProps} from "../models/contextProviderProps";
import {useAuthContext} from "../hooks/useAuthContext";
import {Pagination} from "../models/Pagination";
import {Post} from "../models/Post";


interface BlogPostsContextValue {
    addPost: (data: Partial<Post>) => Promise<void>,
    deletePost: (id: number) => Promise<void>,
    getPostById: (id: number) => Promise<Post>,
    postsPagination: Pagination,
    setPostsPagination: Dispatch<SetStateAction<Pagination>>
}

export const BlogPostsContext =
    createContext<BlogPostsContextValue | null>(null);

export function BlogPostsProvider({children}: ContextProviderProps) {
    const [postsPagination, setPostsPagination] = useState<Pagination>({
        currentPage: 1,
        pageSize: 10,
        query: ""
    })

    const authContext = useAuthContext();

    async function getPostById(id: number): Promise<Post> {
        return await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`).then(data => data.json());
    }

    async function addPost(data: Partial<Post>) {
        const postToSend = {...data}
        postToSend.posted_by = authContext.user!.id;
        await fetch(`${process.env.REACT_APP_API_URL}/posts`, {method: "POST", headers: {"content-type": "application/json"}, body: JSON.stringify(postToSend)})
    }

    async function deletePost(id: number) {
        await fetch(`${process.env.REACT_APP_API_URL}/posts/${id}`, {method: "DELETE"}).then(() => alert(`success! post ${id} deleted!`));
    }

    const value: BlogPostsContextValue = {addPost, deletePost, getPostById, postsPagination, setPostsPagination}

    return (
        <BlogPostsContext.Provider value={value}>
            {children}
        </BlogPostsContext.Provider>
    )
}