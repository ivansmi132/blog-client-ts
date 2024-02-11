import {Button} from "antd";
import {useForm} from "react-hook-form";
import {NewPost, Post} from "../../models/Post";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {usePostsAPI} from "../../hooks/usePostsAPI";
import {usePaginationContext} from "../../hooks/usePaginationContext";
import {ControlledTextArea} from "./ControlledTextArea";
import {ControlledUploadImage} from "./ControlledUploadImage";
import {createFormData} from "../../models/createFormData";

export function EditPostForm({selectedPost}: {selectedPost: Post}) {

    const navigate = useNavigate();

    /*
    the useLocation hook is used to parse the state prop of the react-router-dom Link component
    upon redirects
     */
    let locationData = useLocation();


    const {getPostById, editPost} = usePostsAPI();

    const {resetToPage1} = usePaginationContext();

    const {handleSubmit, control} =
        useForm<Post>(
        {values: selectedPost}
        );

    // useEffect(() => {
    //
    //         const postId = locationData.state;
    //         getPostById(postId)
    //             .then((post) => setSelectedPost(post));
    //
    // }, []);


    function onEditSubmition(data: NewPost) {
        console.log(data);
        const formData = createFormData(data);
        editPost(formData, selectedPost!.id)
            .then(() => {
                resetToPage1();
                navigate(`/posts/${selectedPost!.id}`);
            });
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