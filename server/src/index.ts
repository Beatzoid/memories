import "dotenv-safe/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts";

const app = express();

// Routes
app.use("/posts", postRoutes);

app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);

    mongoose
        .connect(process.env.MONGODB_URL!)
        .then(() => console.log("Successfully connected to mongoDB"))
        .catch((err) => console.log(err));
});
