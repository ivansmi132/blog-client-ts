import {CreatePostForm} from "../components/forms/CreatePostForm";
import {useAuthContext} from "../hooks/useAuthContext";
import {UnauthorizedPage} from "./UnauthorizedPage";

export function PostCreationPage() {

    const authContext = useAuthContext();

    return authContext.user? <CreatePostForm /> : <UnauthorizedPage />
}