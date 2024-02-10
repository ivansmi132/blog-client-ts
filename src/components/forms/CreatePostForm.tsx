import {Button, Input, Upload} from 'antd';
import {Controller, useForm} from "react-hook-form";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {NewPost} from "../../models/Post";
import {useNavigate} from "react-router-dom";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import { UploadOutlined } from '@ant-design/icons';
import {useState} from "react";

export function CreatePostForm() {
    const {TextArea} = Input;

    const {addPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {handleSubmit, control} = useForm<NewPost>();

    const [image, setImage] = useState("");

    const navigate = useNavigate();

    function onPostSubmition(postData: NewPost) {
        console.log("onSubmit data:", postData);
        const formData = createFormData(postData);
        addPost(formData)
            .then(() => {
                resetToPage1();
                navigate('/posts');
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
            <Controller
                control={control}
                name="title"
                render={( {field: {onChange, value} }) => (
                    <>
                    <label htmlFor="title">Title</label>
                    <TextArea id="title" autoSize={ { minRows: 2 } } onChange={onChange} value={value}></TextArea>
                    </>
                )}
            />
            <Controller
                control={control}
                name="content"
                render={( {field: {onChange, value} }) => (
                    <>
                        <label htmlFor="content">Title</label>
                        <TextArea id="content" autoSize={ { minRows: 2 } } onChange={onChange} value={value}></TextArea>
                    </>
                )}
            />
            <Controller
                control={control}
                name="image"
                render={( {field: {onChange} }) => (
                    <>
                        <Upload name='image'
                                onChange={onChange}
                                onRemove={() => setImage("")}
                                maxCount={1}
                                beforeUpload={(file) => {
                                    setImage(URL.createObjectURL(file));
                                    return false}}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </>
                )}
            />

            {image && <img src={image} alt='preview'/>}


            <Button style={{margin: "30px"}} htmlType="submit">Create Post</Button>

        </form>
    )

}

