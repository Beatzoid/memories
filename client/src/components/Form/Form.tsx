import {
    FormEvent,
    useState,
    Dispatch,
    SetStateAction,
    useEffect
} from "react";

import { useAppDispatch, useAppSelector } from "../../types/redux";
import { Post } from "../../types/post";

import { createPost, updatePost } from "../../actions/posts";

import { Paper, TextField, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import useStyles from "./form.styles";
const Form = ({
    currentId,
    setCurrentId
}: {
    currentId: string;
    setCurrentId: Dispatch<SetStateAction<string | null>>;
}) => {
    const styles = useStyles();

    const user = JSON.parse(localStorage.getItem("profile")!);

    const dispatch = useAppDispatch();
    const post = useAppSelector((state: { posts: Post[] }) =>
        currentId ? state.posts.find((p) => p._id === currentId) : null
    );

    const [postData, setPostData] = useState({
        title: "",
        message: "",
        tags: [""],
        selectedFile: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (currentId) {
            setLoading(true);
            await dispatch(
                updatePost(currentId!, {
                    ...postData,
                    name: user?.result.name,
                    likes: []
                })
            );
            setLoading(false);
        } else {
            setLoading(true);
            await dispatch(
                createPost({ ...postData, name: user?.result.name, likes: [] })
            );
            setLoading(false);
        }

        clear();
    };

    const handleFile = (e: any) => {
        const img = new Image();

        // Convert image to Base64
        const reader = new FileReader();
        reader.addEventListener("load", (event) => {
            img.src = event.target!.result! as string;

            setPostData({ ...postData, selectedFile: img.src });
        });

        reader.readAsDataURL(e.target.files[0]);
    };

    const clear = () => {
        setPostData({
            title: "",
            message: "",
            tags: [""],
            selectedFile: ""
        });
        setCurrentId(null);
    };

    if (!user?.result?.name) {
        return (
            <Paper className={styles.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create your own memories and like other's
                    memories
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={styles.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${styles.root} ${styles.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? "Editing" : "Create"} a Memory
                </Typography>

                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={(e) =>
                        setPostData({ ...postData, title: e.target.value })
                    }
                />

                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={(e) =>
                        setPostData({ ...postData, message: e.target.value })
                    }
                />

                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={(e) =>
                        setPostData({
                            ...postData,
                            tags: e.target.value.split(",")
                        })
                    }
                />

                <div className={styles.fileInput}>
                    <input type="file" multiple={false} onChange={handleFile} />
                </div>

                {loading ? (
                    <LoadingButton
                        loading
                        style={{ marginBottom: "15px" }}
                        className={styles.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </LoadingButton>
                ) : (
                    <Button
                        style={{ marginBottom: "15px" }}
                        className={styles.buttonSubmit}
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={clear}
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
