import { Post } from "../../types/post";
import { useAppSelector } from "../../types/redux";

import PostComponent from "./Post/post";

import useStyles from "./styles";

const Posts = () => {
    const styles = useStyles();
    const posts = useAppSelector((state: any) => state.posts);

    console.log(posts);

    return (
        <>
            <h1>Posts</h1>
            <PostComponent />
            <PostComponent />
        </>
    );
};

export default Posts;
