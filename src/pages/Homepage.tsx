import {PostCard} from "../components/posts-related/PostCard";
import {useEffect, useState} from "react";
import {PostsState} from "../models/PostsState";
import {usePostsAPI} from "../hooks/usePostsAPI";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

export function Homepage() {
    const [loading, setLoading] = useState(true);

    const [posts, setPostsData]
        = useState<PostsState>({list: [], totalPostsNumber: 0});

    const {fetchLatestPosts} = usePostsAPI();

    const navigate = useNavigate();

    useEffect(() => {
        fetchLatestPosts()
            .then(posts => {
                setPostsData({
                    list: posts.posts,
                    totalPostsNumber: posts.posts_number
                });
                setLoading(false);
            })
            .catch(() => navigate('/server_error'))
    }, []);

    return (
        <>
            <div className="homepage-header-container">
            <h1 className="header">Welcome!</h1>
                <p style={{
                    fontSize: "40px",
                }}>
                    Enjoy reading this blog, made from posts by the community.
                    Sign in to create a post of your own and contribute to the blog from your knowledge, interests or experience.
                </p>
            </div>

            <hr style={{margin: "5% 5%"}}/>

            <h1 className="header" style={{marginBottom: "3%"}}>Latest Posts</h1>
            <div className={"posts-list"}>
                {posts.list.slice(0, 3).map((post) =>
                    <PostCard
                        setLoading={setLoading}
                        loading={loading}
                        key={post.id}
                        post={post}/>
                )}
            </div>

            <Button className="large-button"
                    onClick={() => {navigate("/posts"); window.scrollTo(0, 0)}}>
                To Posts
            </Button>
        </>
    )
}