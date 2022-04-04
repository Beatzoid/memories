import { Request, Response } from "express";
import mongoose from "mongoose";

import PostMessage from "../models/postMessage";

export const getPosts = async (req: Request, res: Response) => {
    const { page }: { page: number } = req.query as any;
    // Number of posts per page
    const LIMIT = 8;
    // Get the starting index of every page
    const startIndex = (Number(page) - 1) * LIMIT;

    try {
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find()
            .sort({ _id: -1 })
            .limit(LIMIT)
            .skip(startIndex);

        return res.json({
            data: posts,
            currentPage: Number(page),
            numberOfPages: Math.ceil(total / LIMIT)
        });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        if (!post) return res.status(404).json({ error: "Post not found" });

        return res.json(post);
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};

export const createPost = async (req: Request, res: Response) => {
    const post = req.body;

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

export const getPostsBySearch = async (req: Request, res: Response) => {
    const { searchQuery, tags }: { searchQuery: string; tags: string } =
        req.query as any;

    try {
        const title = new RegExp(searchQuery, "i");

        const posts = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }]
        });

        return res.json({ data: posts });
    } catch (error: any) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
};
