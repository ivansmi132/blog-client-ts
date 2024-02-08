import {Button, Input, Image} from "antd";
import {Controller, useForm} from "react-hook-form";
import {Post} from "../../models/Post";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {usePostsAPI} from "../../hooks/usePostsAPI";

export function EditPostForm() {

    const navigate = useNavigate();

    let locationData = useLocation();

    const {TextArea} = Input;

    const [selectedPost, setSelectedPost] = useState<Post>();

    const {getPostById, editPost} = usePostsAPI();

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

    function onEditSubmition(data: Partial<Post>) {
        console.log(data);
        editPost(data)
            .then(() => navigate('/posts'));
    }

    return (
        <form style={{width: "50%", margin: "auto"}} onSubmit={handleSubmit(onEditSubmition)}>
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
                        <label htmlFor="content">Content</label>
                        <TextArea id="content" autoSize={ { minRows: 2 } } onChange={onChange} value={value}></TextArea>
                    </>
                )}
            />

            <Controller
                control={control}
                name="image_url"
                render={( {field: { value} }) => (
                    <div style={{marginTop: "30px"}}>
                        <Image src={value} width={400} />
                    </div>

                )}
            />


            <Button style={{margin: "30px"}} htmlType="submit">Edit Post</Button>

        </form>
    )

}