import {Button, notification} from "antd";
import {useForm} from "react-hook-form";
import {NewPost, Post} from "../../models/Post";
import {useNavigate} from "react-router-dom";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {ControlledTextArea} from "../form-parts/ControlledTextArea";
import {ControlledUploadImage} from "../form-parts/ControlledUploadImage";
import {createFormData} from "../../utils/createFormData";
import {useState} from "react";

export function EditPostForm({selectedPost}: {selectedPost: Post}) {

    const navigate = useNavigate();

    const {editPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    // resetKey is used as key for ControlledImageUpload to make it remount
    // upon clicking reset button
    const [resetKey, setResetKey] = useState("1");

    const {
        handleSubmit,
        control,
        reset
    } = useForm<Post>({
            values: selectedPost,
            shouldFocusError: false});

    async function onEditSubmition(data: NewPost) {

        const formData = createFormData(data);

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

    function onReset() {
        reset();
        setResetKey((prev) =>
            (Number(prev) + 1).toString())
    }

    return (
        <form className="form"
              onSubmit={handleSubmit(onEditSubmition)}>

            <ControlledTextArea name={"title"}
                                control={control}
                                maxLength={100}/>

            <ControlledTextArea name={"content"}
                                control={control}
                                maxLength={5000}/>

            {selectedPost &&
                <ControlledUploadImage
                    key={resetKey}
                    control={control}
                    image_url={selectedPost.image_url}
                />
            }

            <Button style={{maxWidth: "150px"}} onClick={onReset}>
                Reset to Original
            </Button>

            <Button style={{maxWidth: "100px"}} htmlType="submit">
                Edit Post
            </Button>

        </form>
    )

}