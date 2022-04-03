import { Router } from "express";

import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost
} from "../controllers/posts";

import auth from "../middleware/auth";

const router = Router();

router.get("/", getPosts);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

router.patch("/:id/like", auth, likePost);

export default router;
