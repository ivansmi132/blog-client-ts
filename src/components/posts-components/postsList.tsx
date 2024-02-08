import {useEffect, useRef, useState} from "react";
import {Pagination} from "antd";
import {PostCard} from "./postCard";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {Post} from "../../models/Post";
import {usePostsAPI} from "../../hooks/usePostsAPI";


interface PostsState {
    list: Post[];
    totalPostsNumber: number;
}

export function PostsList() {

    const {postsPagination, setPostsPagination} = usePaginationContext();

    const {fetchAllPosts} = usePostsAPI();

    const [posts, setPostsData]
        = useState<PostsState>({list: [], totalPostsNumber: 0});

    const postsSection = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts().then(() => setLoading(false))
    }, [postsPagination]);

    const fetchPosts = async() => {
        return await fetchAllPosts()
            .then(fetchedPosts => {
                console.log(fetchedPosts);
                setPostsData(() => {
                    return {
                        list: fetchedPosts.posts,
                        totalPostsNumber: fetchedPosts.posts_number
                    }
                })
            })
    }

    return (
        <>
            <div ref={postsSection} className={"posts-list"}>
                {posts.list.map((post) =>
                    <PostCard setLoading={setLoading} loading={loading} key={post.id} post={post}/>
                )}
            </div>
            <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
                <Pagination current={postsPagination.currentPage}
                            total={posts.totalPostsNumber}
                            pageSize={postsPagination.pageSize}
                            hideOnSinglePage
                            showSizeChanger={false}
                            onChange={(page, pageSize) => {
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