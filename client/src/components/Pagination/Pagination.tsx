import { useEffect } from "react";

import { Pagination, PaginationItem } from "@mui/material";

import { Link } from "react-router-dom";

import useStyles from "./styles";

import { useAppDispatch, useAppSelector } from "../../types/redux";
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }: { page: number }) => {
    const styles = useStyles();

    const dispatch = useAppDispatch();
    const { numberOfPages, currentPage } = useAppSelector(
        (state: any) => state.posts
    );

    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: styles.ul }}
            count={numberOfPages}
            page={currentPage || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    {...item}
                    component={Link}
                    to={`/posts?page=${item.page}`}
                />
            )}
        />
    );
};

export default Paginate;
