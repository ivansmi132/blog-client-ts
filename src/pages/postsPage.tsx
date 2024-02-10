import Search from "antd/es/input/Search";
import {useRef} from "react";
import { PostsList } from "../components/posts-components/postsList";
import {usePaginationContext} from "../hooks/usePaginationContext";

export const PostsPage = (function PostsPage() {
    const {
        postsPagination,
        setPostsPagination,
    } = usePaginationContext();
    const postsSection = useRef<HTMLDivElement>(null);

    const handleUserInput = (value: string, event: any) => {
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
            <h1 className="header">Posts</h1>
            <div ref={postsSection}>
                <div style={{textAlign: "center", marginBottom: "2%"}}>
                    <Search placeholder="search by title ..." defaultValue={postsPagination.query} allowClear
                            onSearch={handleUserInput} style={{width: 200}}/>
                </div>
                <PostsList/>
            </div>

        </>
    );
})