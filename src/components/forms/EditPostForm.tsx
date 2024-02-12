import {Button, notification} from "antd";
import {useForm} from "react-hook-form";
import {NewPost, Post} from "../../models/Post";
import {useNavigate} from "react-router-dom";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {ControlledTextArea} from "./ControlledTextArea";
import {ControlledUploadImage} from "./ControlledUploadImage";
import {createFormData} from "../../utils/createFormData";

export function EditPostForm({selectedPost}: {selectedPost: Post}) {

    const navigate = useNavigate();

    const {editPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {
        handleSubmit,
        control,
    } = useForm<Post>({
            values: selectedPost,
            shouldFocusError: false});

    async function onEditSubmition(data: NewPost) {

        const formData = createFormData(data);

        // this happens if the post did not have an image, or it was removed by the user
        // needs some work!
        if (!selectedPost.image_url) {
            formData.set("image_url", "");
        }

        await editPost(formData, selectedPost!.id);
        notification.success(
            {
                duration: 3,
                message: "Post Edited! Moving to the post page",
                onClose: () => {
                    resetToPage1();
                    navigate(`/posts/${selectedPost.id}`);
                }
            }
        );

    }

    return (
        <form style={{width: "50%", margin: "auto"}}
              onSubmit={handleSubmit(onEditSubmition)}>

            <ControlledTextArea name={"title"}
                                control={control}
                                maxLength={100}/>

            <ControlledTextArea name={"content"}
                                control={control}
                                maxLength={5000}/>

            {selectedPost &&
                <ControlledUploadImage
                    control={control}
                    image_url={selectedPost.image_url}
                />
            }

            <Button style={{margin: "30px"}} htmlType="submit">
                Edit Post
            </Button>

        </form>
    )

}