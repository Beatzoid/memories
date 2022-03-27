import { Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    const theme = createTheme();

    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Container maxWidth="lg">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/auth" element={<Auth />} />
                    </Routes>
                </Container>
            </ThemeProvider>
        </BrowserRouter>
    );
};

export default App;
