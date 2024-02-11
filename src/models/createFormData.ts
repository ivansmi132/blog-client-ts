import {NewPost} from "./Post";

/*
FormData can be used to send files over HTTP post requests, along with regular form inputs.
The browser automatically sets the content type header to multipart/form-data
when the request body is set with a FormData object.
 */
export function createFormData(post: NewPost) {

    const formData = new FormData();

    if (post.title) formData.append("title", post.title);
    if (post.content) formData.append("content", post.content);
    if (post.image && post.image.file instanceof File) {
        formData.append("image", post.image.file);
    }

    return formData;
}