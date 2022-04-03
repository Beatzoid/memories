import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import { useAppDispatch } from "../../../types/redux";
import { deletePost, likePost } from "../../../actions/posts";

import useStyles from "./post.styles";

import { Post } from "../../../types/post";
import { Dispatch, SetStateAction } from "react";

const PostComponent = ({
    post,
    setCurrentId
}: {
    post: Post;
    setCurrentId: Dispatch<SetStateAction<string | null>>;
}) => {
    const dispatch = useAppDispatch();

    const user = JSON.parse(localStorage.getItem("profile")!);

    const styles = useStyles();

    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?._id)
            ) ? (
                <>
                    <ThumbUpAltIcon fontSize="small" />
                    &nbsp;
                    {post.likes.length > 2
                        ? `You and ${post.likes.length - 1} others`
                        : `${post.likes.length} like${
                              post.likes.length > 1 ? "s" : ""
                          }`}
                </>
            ) : (
                <>
                    <ThumbUpAltOutlined fontSize="small" />
                    &nbsp;{post.likes.length}{" "}
                    {post.likes.length === 1 ? "Like" : "Likes"}
                </>
            );
        }

        return (
            <>
                <ThumbUpAltOutlined fontSize="small" />
                &nbsp;Like
            </>
        );
    };

    return (
        <Card className={styles.card}>
            <CardMedia
                className={styles.media}
                image={post.selectedFile}
                title={post.title}
            />

            <div className={styles.overlay}>
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">
                    {dayjs(post.createdAt!).fromNow()}
                </Typography>
            </div>

            {(user?.result?.googleId === post?.creator ||
                user?.result?._id === post?.creator) && (
                <div className={styles.overlay2}>
                    <Button
                        style={{ color: "white" }}
                        size="small"
                        onClick={() => setCurrentId(post._id!)}
                    >
                        <MoreHorizIcon />
                    </Button>
                </div>
            )}

            <div className={styles.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.map((tag) => `#${tag} `)}
                </Typography>
            </div>

            <Typography className={styles.title} variant="h5" gutterBottom>
                {post.title}
            </Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.message}
                </Typography>
            </CardContent>

            <CardActions className={styles.cardActions}>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => dispatch(likePost(post._id!))}
                    disabled={!user?.result}
                >
                    <Likes />
                </Button>

                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <Button
                        size="small"
                        color="primary"
                        onClick={() => dispatch(deletePost(post._id!))}
                    >
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                )}
            </CardActions>
        </Card>
    );
};

export default PostComponent;
