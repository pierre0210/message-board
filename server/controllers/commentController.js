import db from "../models/index.js";

/**
 * Post comment function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const postComment = async (req, res) => {
  try {
    const username = req.userData.username;
    const content = req.body.content;
    if (!content) {
      res.status(400).send({ message: "No content." });
      return;
    }
    const replyId = req.body.replyId || null;
    const database = await db();
    const Comment = database.models.Comment;
    const lastestComment = (await Comment.max("comment_id")) || 0;
    await Comment.create({
      comment_id: lastestComment.comment_id + 1,
      user_name: username,
      content: content,
      reply_id: replyId,
    });
    res.send({ message: "Comment create successfully." });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

/**
 * Get comment function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      res.status(404).send({ message: "Comment id is empty." });
      return;
    }
    const database = await db();
    const Comment = database.models.Comment;
    const resultComment = await Comment.findOne({
      where: { comment_id: commentId },
    });
    if (!resultComment) {
      res.status(404).send({ message: "Comment not found." });
      return;
    }
    res.send({ message: "Comment found.", data: resultComment.toJSON() });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
export const deleteComment = () => {};
