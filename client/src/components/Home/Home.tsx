import { useState, useEffect } from "react";
import { Grow, Container, Grid } from "@mui/material";

import { getPosts } from "../../actions/posts";
import { useAppDispatch } from "../../types/redux";

import useStyles from "./home.styles";

import Form from "../Form/Form";
import Posts from "../Posts/Posts";

const Home = () => {
    const styles = useStyles();

    const [currentId, setCurrentId] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Grow in>
            <Container>
                <Grid
                    className={styles.mainContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form
                            currentId={currentId!}
                            setCurrentId={setCurrentId}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
