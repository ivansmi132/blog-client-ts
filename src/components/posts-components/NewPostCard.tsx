import { Card } from "antd";
import {Post} from "../../models/Post";
import React from "react";

interface PostCardProps {
    post: Partial<Post>,
    loading: boolean;
    setLoading: CallableFunction
}
export function NewPostCard({post, loading, setLoading}: PostCardProps) {
    const { title, image_url, user} = post;

    return (
        <Card loading={loading} className={"post-card"}>
            <img
                className="post-image"
                alt=""
                src={image_url}
            />

            <div className="post-card-info">

            </div>

        </Card>
    )
}