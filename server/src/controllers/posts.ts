import { Request, Response } from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage";

export const getPosts = async (_: Request, res: Response) => {
    try {
        const postMessages = await PostMessage.find();

        return res.json(postMessages);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const createPost = async (req: Request, res: Response) => {
    const post = req.body;

    const newPost = new PostMessage(post);

    try {
        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).json({ err: "Post not found" });

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            { ...req.body, _id },
            {
                new: true
            }
        );

        return res.status(201).json(updatedPost);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
