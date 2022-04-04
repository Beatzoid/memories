import { Router } from "express";

import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch
} from "../controllers/posts";

import auth from "../middleware/auth";

const router = Router();

router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

router.patch("/:id/like", auth, likePost);

export default router;
