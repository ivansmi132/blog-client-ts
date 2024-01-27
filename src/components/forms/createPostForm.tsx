import {Button, Input} from 'antd';
import {Controller, useForm} from "react-hook-form";
import {useBlogPostsContext} from "../../hooks/useBlogPostsContext";

interface newlyCreatedPost {
    title: string,
    content: string,
}
export function CreatePostForm() {
    const {TextArea} = Input;

    const blogPostsContext = useBlogPostsContext();


    const {handleSubmit, control} = useForm<newlyCreatedPost>();

    function onPostSubmition(data: newlyCreatedPost) {
        console.log(data);
        // blogPostsContext.addPost(data);
        alert("Post created!");

    }
    return (
        <form onSubmit={handleSubmit(onPostSubmition)}>
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
            <Button htmlType="submit">Create Post</Button>

        </form>
    )

}

