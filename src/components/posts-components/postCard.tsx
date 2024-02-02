import {Card, Flex, Typography} from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../../models/Post";

interface PostCardProps {
    post: Partial<Post>,
    loading: boolean;
    setLoading: CallableFunction
}

export function PostCard({post, loading, setLoading}: PostCardProps) {
    const { title, image_url, creation_date} = post;

    return (
        <Card loading={loading} className={"post-container"}>
            <Flex justify="space-between">
                <img
                    className="post-image"
                    alt="image"
                    src={image_url}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                    <div className="date">{new Date(creation_date!).toLocaleDateString().replaceAll("/", " ")}</div>
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