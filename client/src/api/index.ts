import axios from "axios";
import { Post } from "../types/post";

const url = "http://localhost:4000/posts";

export const fetchPosts = () => axios.get(url);
export const createPost = (newPost: Post) => axios.post(url, newPost);
export const updatePost = (id: string, updatedPost: Post) =>
    axios.patch(`${url}/${id}`, updatedPost);
