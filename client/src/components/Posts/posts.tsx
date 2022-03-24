import { Dispatch, SetStateAction } from "react";

import { CircularProgress, Grid, Typography } from "@mui/material";

import { Post } from "../../types/post";
import { useAppSelector } from "../../types/redux";

import PostComponent from "./Post/post";

import useStyles from "./styles";

const Posts = ({
    setCurrentId
}: {
    setCurrentId: Dispatch<SetStateAction<string | null>>;
}) => {
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
                    <PostComponent post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
