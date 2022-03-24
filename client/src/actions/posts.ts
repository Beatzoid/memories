import * as api from "../api";
import { AppDispatch } from "../main";

import { Post } from "../types/post";

// Action Creators
export const getPosts = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: "FETCH_ALL", payload: data });
    } catch (err) {
        console.error(err);
    }
};

export const createPost = (post: Post) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: "CREATE", payload: data });
    } catch (err) {
        console.error(err);
    }
};

export const updatePost =
    (id: string, post: Post) => async (dispatch: AppDispatch) => {
        try {
            const { data } = await api.updatePost(id, post);

            dispatch({ type: "UPDATE", payload: data });
        } catch (err) {
            console.error(err);
        }
    };
