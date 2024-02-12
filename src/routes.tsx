import { createBrowserRouter } from "react-router-dom";
import {MyApp} from './App';
import {Homepage} from "./pages/Homepage";
import {PostsPage} from "./pages/PostsPage";
import {SinglePostPage} from "./pages/SinglePostPage";
import {AdminPage} from "./pages/AdminPage";
import {PostCreationPage} from "./pages/CreatePostPage";
import {EditPostPage} from "./pages/EditPostPage";
import {NotFoundPage} from "./pages/error-pages/NotFoundPage";
import {UnauthorizedPage} from "./pages/error-pages/UnauthorizedPage";
import {ServerErrorPage} from "./pages/error-pages/ServerErrorPage";


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
                element: <EditPostPage />
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