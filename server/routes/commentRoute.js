import express from "express";
import {
  postComment,
  getComment,
  getCommentsInRange,
  getCommentCount,
  deleteComment,
  editComment,
} from "../controllers/commentController.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.post("/", verifyAccessToken, postComment);
router.get("/count", verifyAccessToken, getCommentCount);
router.get("/:id", verifyAccessToken, getComment);
router.get("/", verifyAccessToken, getCommentsInRange);
router.delete("/:id", verifyAccessToken, deleteComment);
router.put("/:id", verifyAccessToken, editComment);

export default router;
