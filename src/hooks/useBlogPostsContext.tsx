import {BlogPostsContext} from "../providers/blogposts-provider";
import {useContext} from "react";

export function useBlogPostsContext() {
    const context = useContext(BlogPostsContext);
    if (!context) {
        throw new Error("useBlogPostsContext must be used within BlogPostsProvider");
    }
    return context
}