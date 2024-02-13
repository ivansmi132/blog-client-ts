import {CreatePostForm} from "../components/forms/CreatePostForm";
import {useAuthContext} from "../hooks/useAuthContext";
import {UnauthorizedPage} from "./error-pages/UnauthorizedPage";
import React from "react";

export function PostCreationPage() {

    const authContext = useAuthContext();

    return (
        authContext.user?
            <>
                <h1 className="header form-page">Create Post</h1>
                <CreatePostForm/>
            </>
            :
            <UnauthorizedPage />
    )
}