import {Card, Typography} from "antd";
import {Post} from "../../models/Post";
import React from "react";
import {PostDate} from "./PostDate";
import {PostCreatorInfo} from "./PostCreatorInfo";
import {Link} from "react-router-dom";

interface PostCardProps {
    post: Partial<Post>,
    loading: boolean;
    setLoading: CallableFunction
}
export function PostCard({post, loading, setLoading}: PostCardProps) {

    const { title, image_url, user} = post;

    return (
        <Card loading={loading} className={"post-card"}>

            <div className="post-card-contents">

                <img className="post-card-image"
                     alt=""
                     src={image_url}
                />

                <div className="post-card-info">

                    <PostDate className={"date"} date={post.creation_date!} />

                    <PostCreatorInfo user={user!} />

                    <Typography.Title level={3}>
                        {title}
                    </Typography.Title>

                    <div className="btn">
                        <Link to={`/posts/${post.id}`}
                              style={{color: "white"}}
                              onClick= {() => window.scrollTo(0, 0)}>
                            Read More
                        </Link>
                    </div>

                </div>

            </div>
        </Card>
    )
}