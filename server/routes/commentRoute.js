import express from "express";
import {
  postComment,
  getComment,
  deleteComment,
} from "../controllers/commentController.js";

const router = express.Router();

router.post("/", postComment);
router.get("/:id", getComment);
router.delete("/:id", deleteComment);

export default router;
