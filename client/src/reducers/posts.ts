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

import { Post } from "../types/post";

export default (
    state: { posts: Post[]; loading: boolean } = { posts: [], loading: true },
    action: any
) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true };

        case END_LOADING:
            return { ...state, isLoading: false };

        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };

        case FETCH_POST:
            return {
                ...state,
                post: action.payload
            };

        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };

        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                )
            };

        case CREATE:
            return { ...state, posts: [...state.posts, action.payload] };

        case UPDATE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post
                )
            };

        case DELETE:
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== action.payload)
            };
        default:
            return state;
    }
};
