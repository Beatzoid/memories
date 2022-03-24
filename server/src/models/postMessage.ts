import mongoose from "mongoose";

const postMessage = new mongoose.Schema(
    {
        title: String,
        message: String,
        creator: String,
        tags: String,
        selectedFile: String,
        likeCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export default mongoose.model("postMessage", postMessage);
