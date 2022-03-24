import { Router } from "express";

import { getPosts, createPost, updatePost } from "../controllers/posts";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);

export default router;
