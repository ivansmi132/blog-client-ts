import {useEffect, useState} from "react";
import {PostCard} from "./postCard";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {Post} from "../../models/Post";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {PostsPagination} from "../PostsPagination";


interface PostsState {
    list: Post[];
    totalPostsNumber: number;
}

export function PostsList() {

    const [posts, setPostsData]
        = useState<PostsState>({list: [], totalPostsNumber: 0});

    // improving user experience by displaying loading indicators on post cards
    const [loading, setLoading] = useState(true);

    const {postsPagination} = usePaginationContext();

    const {fetchAllPosts} = usePostsAPI();

    useEffect(() => {

        fetchPosts().then(() => setLoading(false));

    }, [postsPagination.currentPage]);

    async function fetchPosts() {
        const fetchedPosts = await fetchAllPosts();
        setPostsData(() => ({
            list: fetchedPosts.posts,
            totalPostsNumber: fetchedPosts.posts_number
        }));
    }

    return (
        <>
            <div className={"posts-list"}>
                {posts.list.map((post) =>
                    <PostCard setLoading={setLoading} loading={loading} key={post.id} post={post}/>
                )}
            </div>
            <PostsPagination currentNumberOfPosts={posts.totalPostsNumber} setLoading={setLoading} />
        </>
    )
}