import { Dispatch, SetStateAction } from "react";

import { CircularProgress, Grid, Typography } from "@mui/material";

import { Post } from "../../types/post";
import { useAppSelector } from "../../types/redux";

import PostComponent from "./Post/Post";

import useStyles from "./posts.styles";

const Posts = ({
    setCurrentId
}: {
    setCurrentId: Dispatch<SetStateAction<string | null>>;
}) => {
    const styles = useStyles();
    const { posts, isLoading }: { posts: Post[]; isLoading: boolean } =
        useAppSelector((state: any) => state.posts);

    if (posts.length === 0 && !isLoading) {
        return (
            <Typography variant="h6" align="center">
                No memories found, try creating one!
            </Typography>
        );
    }

    return isLoading ? (
        <CircularProgress />
    ) : (
        <Grid
            className={styles.container}
            container
            alignItems="stretch"
            spacing={3}
        >
            {posts.map((post) => (
                <Grid key={post._id!} item xs={12} sm={12} md={6} lg={4}>
                    <PostComponent post={post} setCurrentId={setCurrentId} />
                </Grid>
            ))}
        </Grid>
    );
};

export default Posts;
