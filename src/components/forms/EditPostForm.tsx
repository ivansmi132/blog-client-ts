import {Button, Input, Image} from "antd";
import {Controller, useForm} from "react-hook-form";
import {NewPost, Post} from "../../models/Post";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {ControlledTextArea} from "./ControlledTextArea";
import {ControlledUploadImage} from "./ControlledUploadImage";

export function EditPostForm() {

    const navigate = useNavigate();

    let locationData = useLocation();

    const [selectedPost, setSelectedPost] = useState<Post>();

    const {getPostById, editPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {handleSubmit, control} = useForm<Post>(
        {values: selectedPost}
    );



    useEffect(() => {
        // when the EditPostForm component is mounted we check if we were redirected to here with a post
        if (locationData.state) {
            const id = locationData.state;
            getPostById(id).then((res) => {
                setSelectedPost(res);
            });
        }

    }, []);

    function onEditSubmition(data: NewPost) {
        console.log(data);
        const formData = createFormData(data);
        editPost(formData, selectedPost!.id)
            .then(() => {
                resetToPage1();
                navigate(`/posts/${selectedPost!.id}`);
            });
    }

    function createFormData(post: NewPost) {
        const formData = new FormData();
        if (post.title) formData.append("title", post.title);
        if (post.content) formData.append("content", post.content);
        if (post.image && post.image.file instanceof File) {
            formData.append("image", post.image.file);
            console.log("image attached");
        }
        return formData;
    }



    return (
        <form style={{width: "50%", margin: "auto"}} onSubmit={handleSubmit(onEditSubmition)}>
            <ControlledTextArea name={"title"} control={control}/>
            <ControlledTextArea name={"content"} control={control}/>
            {selectedPost && <ControlledUploadImage control={control} image_url={selectedPost.image_url} />}
            <Button style={{margin: "30px"}} htmlType="submit">Edit Post</Button>

        </form>
    )

}