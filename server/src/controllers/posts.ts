import { Request, Response } from "express";

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
