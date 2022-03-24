import { FormEvent, useState } from "react";
import FileBase from "react-file-base64";

import { Paper, TextField, Typography, Button } from "@mui/material";
import useStyles from "./styles";

const Form = () => {
    const [postData, setPostData] = useState({
        creator: "",
        title: "",
        message: "",
        tags: "",
        selectedFile: ""
    });

    const styles = useStyles();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {};

    return (
        <Paper className={styles.paper}>
            <form
                autoComplete="off"
                noValidate
                className={`${styles.root} ${styles.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">Create a Memory</Typography>

                <TextField
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth
                    value={postData.creator}
                    onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                    }
                />

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
                        setPostData({ ...postData, tags: e.target.value })
                    }
                />

                <div className={styles.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base }: { base: string }) =>
                            setPostData({ ...postData, selectedFile: base })
                        }
                    />
                </div>

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

                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    fullWidth
                    onClick={() =>
                        setPostData({
                            creator: "",
                            title: "",
                            message: "",
                            tags: "",
                            selectedFile: ""
                        })
                    }
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
