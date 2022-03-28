import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Avatar,
    Container,
    Paper,
    Typography,
    Grid,
    Button
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { GoogleLogin, GoogleLoginResponse } from "react-google-login";

import useStyles from "./auth.styles";
import Input from "./Input";

import Icon from "./icon";

import { useAppDispatch } from "../../types/redux";
import { AUTH } from "../../constants/actionTypes";

const Auth = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);

    const styles = useStyles();

    const handleSubmit = () => {};

    const handleChange = () => {};

    const handleShowPassword = () =>
        setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        setShowPassword(false);
    };

    const googleSuccess = async (res: GoogleLoginResponse) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({ type: AUTH, data: { result, token } });
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    const googleFailure = (error: any) => {
        console.log("Google Sign In Error", error);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={styles.paper} elevation={3}>
                <Avatar className={styles.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography variant="h5">
                    {isSignup ? "Sign Up" : "Sign In"}
                </Typography>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input
                                    name="firstName"
                                    label="First Name"
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />

                                <Input
                                    name="lastName"
                                    label="Last Name"
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}

                        <Input
                            name="email"
                            label="Email Address"
                            handleChange={handleChange}
                            type="email"
                        />

                        <Input
                            name="password"
                            label="Password"
                            handleChange={handleChange}
                            type={showPassword ? "text" : "password"}
                            handleShowPassword={handleShowPassword}
                        />

                        {isSignup && (
                            <Input
                                name="confirmPassword"
                                label="Confirm Password"
                                handleChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                handleShowPassword={handleShowPassword}
                            />
                        )}
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>

                    <GoogleLogin
                        clientId=""
                        render={(renderProps) => (
                            <Button
                                className={styles.googleButton}
                                color="primary"
                                fullWidth
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                                variant="contained"
                            >
                                Google Sign In
                            </Button>
                        )}
                        // @ts-ignore
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup
                                    ? "Already have an account? Sign in"
                                    : "Don't have an account? Sign up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
