import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/postDetails";

const App = () => {
    const theme = createTheme();
    const user = JSON.parse(localStorage.getItem("profile")!);

    const authPage = !user ? <Auth /> : <Navigate to="/posts" />;

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Navigate to="/posts" />} />
                        <Route path="/posts" element={<Home />} />
                        <Route path="/posts/search" element={<Home />} />
                        <Route path="/posts/:id" element={<PostDetails />} />
                        <Route path="/auth" element={authPage} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
