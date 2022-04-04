import "dotenv-safe/config";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts";
import userRoutes from "./routes/user";

const app = express();

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.use(cors());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);

    mongoose
        .connect(process.env.MONGODB_URL!)
        .then(() => console.log("Successfully connected to mongoDB"))
        .catch((err) => console.log(err));
});
