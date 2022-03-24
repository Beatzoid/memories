import { Post } from "../types/post";

export default (posts: Post[] = [], action: any) => {
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;

        case "CREATE":
            return [...posts, action.payload];

        default:
            return posts;
    }
};
