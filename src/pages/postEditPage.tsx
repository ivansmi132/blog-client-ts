import {EditPostForm} from "../components/forms/EditPostForm";
import {useLocation} from "react-router-dom";

export function PostEditPage() {
    let locationData = useLocation();
    if (!locationData.state) {
        return <h1>no selected post to edit</h1>
    }
    return (<EditPostForm />);
}