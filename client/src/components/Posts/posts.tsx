import { CircularProgress, Grid } from "@mui/material";

import { Post } from "../../types/post";
import { useAppSelector } from "../../types/redux";

import PostComponent from "./Post/post";

import useStyles from "./styles";

const Posts = () => {
    const styles = useStyles();
    const posts = useAppSelector((state: { posts: Post[] }) => state.posts);

    return !posts.length ? (
        <CircularProgress />
    ) : (
        <Grid
            className={styles.container}
            container
            alignItems="stretch"
            spacing={3}
        >
            {posts.map((post) => (
                <Grid key={post._id!} item xs={12} sm={6}>
                    <PostComponent post={post} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
