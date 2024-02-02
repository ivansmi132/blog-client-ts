import { createBrowserRouter } from "react-router-dom";
import {MyApp} from './App';
import {Homepage} from "./pages/homepage";
import {PostsPage} from "./pages/postsPage";
import {SinglePostPage} from "./pages/singlePostPage";
import {AdminPage} from "./pages/adminPage";
import {CreatePostForm} from "./components/forms/CreatePostForm";
import {EditPostForm} from "./components/forms/EditPostForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MyApp/>,
        children: [
            {
                path:"/",
                element: <Homepage />
            },
            {
                path: "posts",
                element: <PostsPage/>,
            },
            {
                path: "posts/:id",
                element: <SinglePostPage />
            },
            {
                path: "admin",
                element: <AdminPage />,
                children: [
                    {
                        path: "create_post",
                        element: <CreatePostForm />
                    },
                    {
                        path:"edit_post",
                        element: <EditPostForm />
                    }
                ]
            }
            ]
    }
])