import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {router} from "./routes";
import {AuthContextProvider} from "./providers/auth-provider";
import {BlogPostsProvider} from "./providers/blogposts-provider";
import {myTheme} from "./providers/config-provider";
import {ConfigProvider} from "antd";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <AuthContextProvider>
        <BlogPostsProvider>
            <ConfigProvider theme={myTheme}>
            <RouterProvider router={router} />
            </ConfigProvider>
        </BlogPostsProvider>
    </AuthContextProvider>
);

