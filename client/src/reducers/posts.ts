import { Post } from "../types/post";

export default (state: Post[] = [], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;

        case "CREATE":
            return state;

        default:
            return state;
    }
};
