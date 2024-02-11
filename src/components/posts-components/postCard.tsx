import {Card, Flex, Typography} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../models/Post";
import {PostCreatorInfo} from "./postCreatorInfo";
import {PostDate} from "../PostDate";

interface PostCardProps {
    post: Partial<Post>,
    loading: boolean;
    setLoading: CallableFunction
}

export function PostCard({post, loading, setLoading}: PostCardProps) {
    const { title, image_url, user} = post;


    return (
        <Card loading={loading} className={"post-container"}>
            <Flex justify="space-between">
                <img
                    className="post-image"
                    alt="image"
                    src={image_url}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                    <PostDate className={"date"} date={post.creation_date!} />
                    <div style={{position: "absolute", top: "-15px", left: "0", background: "white", padding: "3px", borderRadius: "12px"}}>
                        <PostCreatorInfo user={user!} />
                    </div>

                    <Typography.Title level={3}>
                        {title}
                    </Typography.Title>
                    <div className="btn">
                        <Link to={`/posts/${post.id}`} style={{color: "white"}} onClick= {() => window.scrollTo(0, 0)}>Read More</Link>
                    </div>
                </Flex>
            </Flex>
        </Card>
    );
}

