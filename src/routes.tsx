import { createBrowserRouter } from "react-router-dom";
import {MyApp} from './App';
import {Homepage} from "./pages/homepage";
import {PostsPage} from "./pages/postsPage";
import {SinglePostPage} from "./pages/singlePostPage";
import {AdminPage} from "./pages/adminPage";
import {PostCreationPage} from "./pages/postCreationPage";
import {PostEditPage} from "./pages/postEditPage";
import {NotFoundPage} from "./pages/NotFoundPage";
import {UnauthorizedPage} from "./pages/UnauthorizedPage";
import {ServerErrorPage} from "./pages/ServerErrorPage";


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
            },
            {
                path: "create_post",
                element: <PostCreationPage />
            },
            {
                path:"edit_post",
                element: <PostEditPage />
            },
            {
                path: "not_found",
                element: <NotFoundPage />
            },
            {
                path: "unauthorized",
                element: <UnauthorizedPage />
            },
            {
                path: "*",
                element: <NotFoundPage />
            },
            {
                path: '/server_error',
                element: <ServerErrorPage />
            }
            ]
    }
])