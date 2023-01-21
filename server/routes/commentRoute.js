import express from "express";
import {
  postComment,
  getComment,
  deleteComment,
} from "../controllers/commentController.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = express.Router();

router.post("/", verifyAccessToken, postComment);
router.get("/:id", verifyAccessToken, getComment);
router.delete("/:id", verifyAccessToken, deleteComment);

export default router;
