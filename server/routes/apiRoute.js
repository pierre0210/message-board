import express from "express";
import {
  postComment,
  getComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/comment", postComment);
router.get("/comment/:id", getComment);
router.delete("/comment/:id", deleteComment);

export default router;
