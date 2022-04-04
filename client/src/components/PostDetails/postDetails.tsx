import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Paper, Typography, Divider, CircularProgress } from "@mui/material";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import useStyles from "./styles";

import { useAppDispatch, useAppSelector } from "../../types/redux";
import { getPost, getPostsBySearch } from "../../actions/posts";

import { Post } from "../../types/post";

const PostDetails = () => {
    const {
        post,
        posts,
        isLoading
    }: { post: Post; posts: Post[]; isLoading: boolean } = useAppSelector(
        (state: any) => state.posts
    );
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const { id } = useParams();

    const styles = useStyles();

    useEffect(() => {
        dispatch(getPost(id!));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(
                getPostsBySearch({
                    search: "none",
                    tags: post?.tags.join(",")
                })
            );
        }
    }, [post]);

    if (!post) return null;

    if (isLoading)
        return (
            <Paper elevation={6} className={styles.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        );

    const openPost = (_id: string) => {
        navigate(`/posts/${_id}`);
    };

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

    return (
        <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
            <div className={styles.card}>
                <div className={styles.section}>
                    <Typography variant="h3" component="h2">
                        {post.title}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant="h6"
                        color="textSecondary"
                        component="h2"
                    >
                        {post.tags.map((tag: string) => (
                            <Link
                                to=""
                                style={{
                                    textDecoration: "none",
                                    color: "#3f51b5"
                                }}
                            >
                                {` #${tag} `}
                            </Link>
                        ))}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="p">
                        {post.message}
                    </Typography>
                    <Typography variant="h6">
                        Created by:
                        <Link
                            to=""
                            style={{ textDecoration: "none", color: "#3f51b5" }}
                        >
                            {` ${post.name}`}
                        </Link>
                    </Typography>
                    <Typography variant="body1">
                        {dayjs(post.createdAt).fromNow()}
                    </Typography>
                </div>
                <div className={styles.imageSection}>
                    <img
                        className={styles.media}
                        src={
                            post.selectedFile ||
                            "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                        }
                        alt={post.title}
                    />
                </div>
            </div>
            {recommendedPosts.length > 0 && (
                <div className={styles.section}>
                    <Typography gutterBottom variant="h5">
                        You might also like:
                    </Typography>
                    <Divider />
                    <div className={styles.recommendedPosts}>
                        {recommendedPosts.map(
                            ({
                                title,
                                name,
                                message,
                                likes,
                                selectedFile,
                                _id
                            }) => (
                                <div
                                    style={{
                                        margin: "20px",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => openPost(_id!)}
                                    key={_id}
                                >
                                    <Typography gutterBottom variant="h6">
                                        {title}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                    >
                                        {name}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle2"
                                    >
                                        {message}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="subtitle1"
                                    >
                                        Likes: {likes.length}
                                    </Typography>
                                    <img src={selectedFile} width="200px" />
                                </div>
                            )
                        )}
                    </div>
                </div>
            )}
        </Paper>
    );
};

export default PostDetails;
