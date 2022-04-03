import mongoose from "mongoose";

import { Post } from "../types/post";

const postMessage = new mongoose.Schema<Post>(
    {
        title: String,
        message: String,
        creator: String,
        name: String,
        tags: [String],
        selectedFile: String,
        likes: {
            type: [String],
            default: []
        }
    },
    { timestamps: true }
);

export default mongoose.model("postMessage", postMessage);
