import { AppBar, Container, Typography, Grow, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getPosts } from "./actions/posts";
import { useAppDispatch } from "./types/redux";

import Form from "./components/Form/form";
import Posts from "./components/Posts/posts";

import useStyles from "./styles";

import memories from "./images/memories.png";
import { useEffect } from "react";

const App = () => {
    const dispatch = useAppDispatch();

    const styles = useStyles();
    const theme = createTheme();

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <AppBar
                    className={styles.appBar}
                    position="static"
                    color="inherit"
                >
                    <Typography
                        className={styles.heading}
                        variant="h2"
                        align="center"
                    >
                        Memories
                    </Typography>
                    <img
                        className={styles.image}
                        src={memories}
                        alt="Memories"
                        height="40px"
                    />
                </AppBar>
                <Grow in>
                    <Container>
                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="stretch"
                            spacing={4}
                        >
                            <Grid item xs={12} sm={7}>
                                <Posts />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Form />
                            </Grid>
                        </Grid>
                    </Container>
                </Grow>
            </Container>
        </ThemeProvider>
    );
};

export default App;
