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

    console.log(post);

    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        likes: []
    });

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

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).json({ err: "Post not found" });

    try {
        await PostMessage.findByIdAndRemove(id);

        return res.status(200).json({ msg: "Succcessfully deleted" });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const likePost = async (req: Request, res: Response) => {
    const { id: postId } = req.params;

    if (!req.userId) return res.status(401).json({ err: "Unauthorized" });

    if (!mongoose.Types.ObjectId.isValid(postId))
        return res.status(404).json({ err: "Post not found" });

    try {
        const post = await PostMessage.findById(postId);
        if (!post) return res.status(404).json({ err: "Post not found" });

        const liked = post?.likes.includes(req.userId);

        if (!liked) {
            // Like post
            post.likes.push(req.userId);
        } else {
            // Dislike
            post.likes = post.likes.filter((id) => `${id}` !== req.userId);
        }

        post.markModified("likes");

        const updatedPost = await PostMessage.findByIdAndUpdate(postId, post, {
            new: true
        });

        return res.json(updatedPost);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
