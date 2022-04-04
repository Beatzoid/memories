import * as api from "../api";
import {
    CREATE,
    DELETE,
    FETCH_ALL,
    FETCH_BY_SEARCH,
    LIKE,
    UPDATE,
    START_LOADING,
    END_LOADING,
    FETCH_POST
} from "../constants/actionTypes";
import { AppDispatch } from "../main";

import { Post } from "../types/post";

export const getPosts = (page: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: data });

        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const getPost = (id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);

        dispatch({ type: FETCH_POST, payload: data });

        dispatch({ type: END_LOADING });
    } catch (err) {
        console.error(err);
    }
};

export const getPostsBySearch =
    (searchQuery: { search: string; tags: string }) =>
    async (dispatch: AppDispatch) => {
        try {
            dispatch({ type: START_LOADING });
            const {
                data: { data }
            } = await api.fetchPostsBySearch(searchQuery);

            dispatch({ type: FETCH_BY_SEARCH, payload: data });

            dispatch({ type: END_LOADING });
        } catch (error) {
            console.log(error);
        }
    };

export const createPost = (post: Post) => async (dispatch: AppDispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);

        dispatch({ type: CREATE, payload: data });

        dispatch({ type: END_LOADING });
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
