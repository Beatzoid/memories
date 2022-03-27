import { useEffect, useState } from "react";

import { AppBar, Avatar, Button, Toolbar, Typography } from "@mui/material";

import { useNavigate, useLocation } from "react-router-dom";

import useStyles from "./navbar.styles";

import memories from "../../images/memories.png";

import { useAppDispatch } from "../../types/redux";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
    const dispatch = useAppDispatch();

    const styles = useStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(
        // @ts-ignore
        JSON.parse(localStorage.getItem("profile"))
    );

    useEffect(() => {
        // const token = user?.token;

        // TODO: JWT

        // @ts-ignore
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    const logout = () => {
        dispatch({ type: LOGOUT });

        navigate("/");

        setUser(null);
    };

    return (
        <AppBar className={styles.appBar} position="static" color="inherit">
            <div className={styles.brandContainer}>
                <Typography
                    className={styles.heading}
                    variant="h2"
                    align="center"
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate("/")}
                >
                    Memories
                </Typography>

                <img
                    className={styles.image}
                    src={memories}
                    alt="Memories"
                    height="40px"
                    onClick={() => navigate("/")}
                />
            </div>

            <Toolbar className={styles.toolbar}>
                {user && user.result ? (
                    <div className={styles.profile}>
                        <Avatar
                            className={styles.purple}
                            alt={user.result.name}
                            src={user.result.imageUrl}
                        >
                            {user.result.name.charAt(0).toUpperCase()}
                        </Avatar>

                        <Typography className={styles.userName} variant="h6">
                            {user.result.name}
                        </Typography>

                        <Button
                            variant="contained"
                            className={styles.logout}
                            color="secondary"
                            onClick={logout}
                        >
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <Button
                        onClick={() => navigate("/auth")}
                        variant="contained"
                        color="primary"
                    >
                        Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
