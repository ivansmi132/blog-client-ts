import {Button, notification} from 'antd';
import {useForm} from "react-hook-form";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {NewPost} from "../../models/Post";
import {useNavigate} from "react-router-dom";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {ControlledTextArea} from "./ControlledTextArea";
import {ControlledUploadImage} from './ControlledUploadImage';
import {createFormData} from "../../models/createFormData";

export function CreatePostForm() {

    const {addPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {handleSubmit, control} = useForm<NewPost>();

    const navigate = useNavigate();

    async function onPostSubmition(postData: NewPost) {

        console.log("onSubmit data:", postData);
        const formData = createFormData(postData);
        const createdPost = await addPost(formData);
        notification.success(
            {
                duration: 3,
                message: "Post Created! Moving you to the post page",
                onClose: () => {
                    resetToPage1();
                    navigate(`/posts/${createdPost.id}`);
                }
            }
        );
    }

    return (
        <form style={{width: "50%", margin: "auto"}}
              onSubmit={handleSubmit(onPostSubmition)}>

            <ControlledTextArea name={"title"} control={control}/>

            <ControlledTextArea name={"content"} control={control}/>

            <ControlledUploadImage control={control} />

            <Button style={{margin: "30px"}} htmlType="submit">
                Create Post
            </Button>

        </form>
    )

}

