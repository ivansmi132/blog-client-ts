import {Post} from "./Post";

export interface PostsState {
    list: Post[];
    totalPostsNumber: number;
}