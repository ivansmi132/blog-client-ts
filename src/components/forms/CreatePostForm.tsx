import {Button, notification} from 'antd';
import {useForm} from "react-hook-form";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {NewPost} from "../../models/Post";
import {useNavigate} from "react-router-dom";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {ControlledTextArea} from "../form-parts/ControlledTextArea";
import {ControlledUploadImage} from '../form-parts/ControlledUploadImage';
import {createFormData} from "../../utils/createFormData";

export function CreatePostForm() {

    const {addPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {
        handleSubmit,
        control,
    } = useForm<NewPost>({shouldFocusError: false});

    const navigate = useNavigate();

    async function onPostSubmition(postData: NewPost) {

        const formData = createFormData(postData);
        const createdPost = await addPost(formData);
        notification.success(
            {
                duration: 3,
                message: "Post Created! Moving to the post page",
                onClose: () => {
                    resetToPage1();
                    navigate(`/posts/${createdPost.id}`);
                }
            }
        );
    }

    return (
        <form className="form"
              onSubmit={handleSubmit(onPostSubmition)}>

            <ControlledTextArea name={"title"}
                                control={control}
                                maxLength={100}/>

            <ControlledTextArea name={"content"}
                                control={control}
                                maxLength={5000} />

            <ControlledUploadImage control={control} />

            <Button style={{maxWidth: "100px"}} htmlType="submit">
                Create Post
            </Button>

        </form>
    )

}

