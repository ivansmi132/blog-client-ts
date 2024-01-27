import {Button, Card, Flex, Typography} from "antd";
import React from "react";
import './posts.css';
import { Post } from "../../models/Post";

interface PostCardProps {
    post: Partial<Post>,
    loading: boolean;
    setLoading: CallableFunction
}

export function PostCard({post, loading, setLoading}: PostCardProps) {
    const {title, image_url} = post;

    return (
        <Card loading={loading} className={"post-container"}>
            <Flex justify="space-between">
                <img
                    className="post-image"
                    alt="image"
                    src={image_url}
                />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                    <div className="date">25 Jan 2023</div>
                    <Typography.Title level={3}>
                        {title}
                    </Typography.Title>
                    <Button className="btn" type="primary" href={`/posts/${post.id}`} style={{position: "relative"}}>
                        Read More
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
}