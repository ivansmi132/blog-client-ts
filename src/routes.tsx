import { createBrowserRouter } from "react-router-dom";
import {MyApp} from './App';

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MyApp/>,
        children: []
    }
])