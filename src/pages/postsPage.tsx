import Search from "antd/es/input/Search";
import React from "react";
import { PostsList } from "../components/posts-components/PostsList";
import {usePaginationContext} from "../hooks/usePaginationContext";

export function PostsPage() {

    const {
        postsPagination,
        setPostsPagination,
    } = usePaginationContext();

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

            <div style={{textAlign: "center", marginBottom: "2%"}}>
                <Search style={{width: 200}}
                        placeholder="search by title ..."
                        defaultValue={postsPagination.query}
                        allowClear
                        onSearch={handleUserInput}
                        />
            </div>

            <PostsList/>

        </>
    );
}