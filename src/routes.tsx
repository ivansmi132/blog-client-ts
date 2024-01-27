import { createBrowserRouter } from "react-router-dom";
import {MyApp} from './App';
import {Homepage} from "./pages/homepage";
import {PostsPage} from "./pages/postsPage";
import {SinglePostPage} from "./pages/singlePostPage";
import {AdminPage} from "./pages/adminPage";
import {CreatePostForm} from "./components/forms/createPostForm";

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
                element: <PostsPage/>
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
                        path: "newpost",
                        element: <CreatePostForm />
                    }
                ]
            }
            ]
    }
])