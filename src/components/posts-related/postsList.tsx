import {useEffect, useRef, useState} from "react";
import {Pagination} from "antd";
import {PostCard} from "./postCard";
import {useBlogPostsContext} from "../../hooks/useBlogPostsContext";
import {Post} from "../../models/Post";



interface PostsState {
    list: Post[];
    totalPostsNumber: number;
}

export function PostsList() {
    const {postsPagination, setPostsPagination} = useBlogPostsContext();
    const [posts, setPostsData]
        = useState<PostsState>({list: [], totalPostsNumber: 0});
    const postsSection = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async() => {
        return await fetch(
            `${process.env.REACT_APP_API_URL}/posts?page=${postsPagination.currentPage}&search=${postsPagination.query}&pageSize=${postsPagination.pageSize}`,
            {credentials: "include"})
            .then(res => res.json()).then(json => {
                setPostsData(() => {
                    return {
                        list: json[1],
                        totalPostsNumber: json[0].posts_number
                    }
                })
            })
    }

    useEffect(() => {
        fetchPosts().then(() => setLoading(false))
    }, [postsPagination]);

    return (
        <>
            <div ref={postsSection} className={"posts-list"}>
                {posts.list.map((post) =>
                    <PostCard setLoading={setLoading} loading={loading} key={post.id} post={post}/>
                )}
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
                <Pagination current={postsPagination.currentPage} total={posts.totalPostsNumber} pageSize={postsPagination.pageSize} onChange={(page, pageSize) => {
                    setPostsPagination((prev) => {
                        return {
                            ...prev,
                            currentPage: postsPagination.pageSize !== pageSize ? 1 : page,
                            pageSize: pageSize
                        }});
                    setLoading(true);
                    postsSection.current?.scrollIntoView();
                }}/>
            </div>
        </>
    )
}