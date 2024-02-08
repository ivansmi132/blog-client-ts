import {CreatePostForm} from "../components/forms/CreatePostForm";
import {useAuthContext} from "../hooks/useAuthContext";

export function PostCreationPage() {
    const authContext = useAuthContext();
    return authContext.user? (<CreatePostForm />) : <h1>You have to sign-in to post!</h1>
}