import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import {router} from "./routes";
import {AuthContextProvider} from "./providers/auth-provider";
import {myTheme} from "./utils/myTheme";
import {ConfigProvider} from "antd";
import {PaginationContextProvider} from "./providers/pagination-provider";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

    <AuthContextProvider>
        <PaginationContextProvider>
            <ConfigProvider theme={myTheme}>
            <RouterProvider router={router} />
            </ConfigProvider>
        </PaginationContextProvider>
    </AuthContextProvider>
);

