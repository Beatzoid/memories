import axios from "axios";
import { FormData } from "../types/auth";
import { Post } from "../types/post";

const API = axios.create({ baseURL: "http://localhost:4000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("profile")) {
        req.headers!.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")!).token
        }`;
    }

    return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost: Post) => API.post("/posts", newPost);
export const updatePost = (id: string, updatedPost: Post) =>
    API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id: string) => API.delete(`/posts/${id}`);

export const likePost = (id: string) => API.patch(`/posts/${id}/like`);

export const signin = (formData: FormData) =>
    API.post("/user/signin", formData);

export const signup = (formData: FormData) =>
    API.post("/user/signup", formData);
