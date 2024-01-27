import Search from "antd/es/input/Search";
import {useRef} from "react";
import { PostsList } from "../components/posts-related/postsList";
import {useBlogPostsContext} from "../hooks/useBlogPostsContext";

export const PostsPage = (function PostsPage() {
    const {
        postsPagination,
        setPostsPagination,
    } = useBlogPostsContext();
    const postsSection = useRef<HTMLDivElement>(null);

    const handleUserInput = (value: string) => {
        setPostsPagination((prev) => {
            return {
                ...prev,
                currentPage: 1,
                query: value
            }
        });
    }

    return (
        <>
            <div ref={postsSection}>
                <div style={{textAlign: "center", marginBottom: "2%"}}>
                    <Search  placeholder="input search text" defaultValue={postsPagination.query} allowClear onSearch={handleUserInput} style={{ width: 200 }} />
                </div>
                <PostsList />
            </div>

        </>
    );
})