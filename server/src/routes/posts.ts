import { Router } from "express";

import { getPosts, createPost } from "../controllers/posts";

const router = Router();

router.get("/", getPosts);
router.post("/", createPost);

export default router;
