import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography
} from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import useStyles from "./styles";

import { Post } from "../../../types/post";

const PostComponent = ({ post }: { post: Post }) => {
    const styles = useStyles();

    return (
        <Card className={styles.card}>
            <CardMedia
                className={styles.media}
                image={post.selectedFile}
                title={post.title}
            />

            <div className={styles.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">
                    {dayjs(post.createdAt!).fromNow()}
                </Typography>
            </div>

            <div className={styles.overlay2}>
                <Button
                    style={{ color: "white" }}
                    size="small"
                    onClick={() => {}}
                >
                    <MoreHorizIcon />
                </Button>
            </div>

            <div className={styles.details}>
                <Typography variant="body2" color="textSecondary">
                    {post.tags.split(",").map((tag) => `#${tag} `)}
                </Typography>
            </div>

            <CardContent>
                <Typography className={styles.title} variant="h5" gutterBottom>
                    {post.message}
                </Typography>
            </CardContent>

            <CardActions className={styles.cardActions}>
                <Button size="small" color="primary" onClick={() => {}}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like
                    {post.likeCount}
                </Button>

                <Button size="small" color="primary" onClick={() => {}}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
};

export default PostComponent;
