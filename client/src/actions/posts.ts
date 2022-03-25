import * as api from "../api";
import {
    CREATE,
    DELETE,
    FETCH_ALL,
    LIKE,
    UPDATE
} from "../constants/actionTypes";
import { AppDispatch } from "../main";

import { Post } from "../types/post";

// Action Creators
export const getPosts = () => async (dispatch: any) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (err) {
        console.error(err);
    }
};

export const createPost = (post: Post) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });
    } catch (err) {
        console.error(err);
    }
};

export const updatePost =
    (id: string, post: Post) => async (dispatch: AppDispatch) => {
        try {
            const { data } = await api.updatePost(id, post);

            dispatch({ type: UPDATE, payload: data });
        } catch (err) {
            console.error(err);
        }
    };

export const deletePost = (id: string) => async (dispatch: AppDispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (err) {
        console.error(err);
    }
};

export const likePost = (id: string) => async (dispatch: AppDispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({ type: LIKE, payload: data });
    } catch (err) {
        console.log(err);
    }
};
