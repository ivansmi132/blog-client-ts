import {Select } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { PostsList } from "../components/posts-related/PostsList";
import {usePaginationContext} from "../hooks/usePaginationContext";

export function PostsPage() {

    const {
        postsPagination,
        setPostsPagination,
    } = usePaginationContext();


    const selectOptions =[
            { value: 'title', label: 'Title' },
            { value: 'user', label: 'User' },
    ]

    function handleUserInput(value: string, event: any) {

        setPostsPagination((prev) => {
            return {
                ...prev,
                currentPage: 1,
                query: value,
                type: postsPagination.type
            }
        });
    }

    function onTypeSelect(value: string) {
        setPostsPagination((prev) => {
            return {
                ...prev,
                type: value
            }
        })
    }

    return (
        <>
            <h1 className="header">Posts</h1>

            <div className="search-menu-container">
                <Select options={selectOptions}
                        defaultValue={postsPagination.type}
                        onChange={onTypeSelect}
                />
                <Search style={{width: 200}}
                        placeholder={`search by ${postsPagination.type}`}
                        defaultValue={postsPagination.query}
                        allowClear
                        onSearch={handleUserInput}
                        />
            </div>

            <PostsList/>

        </>
    );
}