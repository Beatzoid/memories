import { useState, useEffect } from "react";

import {
    Grow,
    Container,
    Grid,
    Paper,
    AppBar,
    TextField,
    Button,
    Autocomplete
} from "@mui/material";
import { Chip } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import { getPosts, getPostsBySearch } from "../../actions/posts";
import { useAppDispatch } from "../../types/redux";

import useStyles from "./home.styles";

import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import Pagination from "../Pagination/Pagination";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const styles = useStyles();

    const navigate = useNavigate();
    const location = useLocation();
    const query = useQuery();
    const page = Number(query.get("page")) || 1;
    const searchQuery = query.get("searchQuery");

    const [currentId, setCurrentId] = useState<string | null>(null);
    const [search, setSearch] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    };

    const searchPost = () => {
        if (search.trim() || tags.length > 0) {
            dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
            navigate(
                `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(
                    ","
                )}`
            );
        }
    };

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid
                    className={styles.gridContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch"
                    spacing={4}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar
                            className={styles.appBarSearch}
                            position="static"
                            color="inherit"
                        >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeyPress}
                            />

                            {/* https://stackoverflow.com/questions/64324406/how-can-material-ui-chip-array-be-used-like-angular-chip-input */}
                            <Autocomplete
                                style={{ margin: "10px 0" }}
                                multiple
                                id="tags-filled"
                                options={[]}
                                freeSolo
                                renderTags={(
                                    value: string[],
                                    getTagProps: any
                                ) =>
                                    value.map(
                                        (option: string, index: number) => (
                                            <Chip
                                                variant="outlined"
                                                label={option}
                                                {...getTagProps({ index })}
                                            />
                                        )
                                    )
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Search by Tags"
                                        placeholder="Press enter after every tag"
                                    />
                                )}
                                onChange={(e: any) =>
                                    setTags([...tags, e.target.value])
                                }
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                onClick={searchPost}
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form
                            currentId={currentId!}
                            setCurrentId={setCurrentId}
                        />

                        <Paper className={styles.pagination} elevation={6}>
                            <Pagination page={page} />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
