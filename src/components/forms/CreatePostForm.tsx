import {Button, Image, Input, message, notification, Upload} from 'antd';
import {Controller, useForm} from "react-hook-form";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {NewPost} from "../../models/Post";
import {useNavigate} from "react-router-dom";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import { UploadOutlined } from '@ant-design/icons';
import {useState} from "react";
import {ControlledTextArea} from "./ControlledTextArea";
import { ControlledUploadImage } from './ControlledUploadImage';

export function CreatePostForm() {

    const {addPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {handleSubmit, control} = useForm<NewPost>();

    // const [image, setImage] = useState("");

    const navigate = useNavigate();

    function onPostSubmition(postData: NewPost) {
        console.log("onSubmit data:", postData);
        const formData = createFormData(postData);
        addPost(formData)
            .then(response => response.json())
            .then((json) => {
                console.log(json);
                notification.success({duration: 3, message: "Post Created! Moving you to the post page", onClose: () => {
                        resetToPage1();
                        navigate(`/posts/${json.id}`);
                    }})

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
        <form style={{width: "50%", margin: "auto"}} onSubmit={handleSubmit(onPostSubmition)}>
            <ControlledTextArea name={"title"} control={control}/>
            <ControlledTextArea name={"content"} control={control}/>
            <ControlledUploadImage control={control} />
            <Button style={{margin: "30px"}} htmlType="submit">Create Post</Button>
        </form>
    )

}

