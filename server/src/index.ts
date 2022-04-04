import "dotenv-safe/config";

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import cors from "cors";

import postRoutes from "./routes/posts";
import userRoutes from "./routes/user";

const app = express();

app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN); // update to match the domain you will make the request from
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, authorization"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "get,post,put,delete,patch,options"
    );
    next();
});

app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Routes
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// app.use(cors());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);

    mongoose
        .connect(process.env.MONGODB_URL!)
        .then(() => console.log("Successfully connected to mongoDB"))
        .catch((err) => console.log(err));
});
