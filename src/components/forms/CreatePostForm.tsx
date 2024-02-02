import {Button, Input} from 'antd';
import {Controller, useForm} from "react-hook-form";
import {usePostsAPI} from "../../models/usePostsAPI";
import {Post} from "../../models/Post";
import {useNavigate} from "react-router-dom";

export function CreatePostForm() {
    const {TextArea} = Input;

    const {addPost} = usePostsAPI();

    const {handleSubmit, control} = useForm<Partial<Post>>();

    const navigate = useNavigate();

    function onPostSubmition(data: Partial<Post>) {
        console.log(data);
        addPost(data);
        navigate('/posts');
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
            <Button style={{margin: "30px"}} htmlType="submit">Create Post</Button>

        </form>
    )

}

