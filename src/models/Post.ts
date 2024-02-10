import {User} from "./User";

export interface Post {
    title: string,
    content: string,
    image_url: string,
    id: number,
    posted_by: string,
    creation_date: string,
    user: User,
}

export interface NewPost {
    title: string,
    content: string,
    image?: any;
}