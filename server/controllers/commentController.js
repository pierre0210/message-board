import db from "../models/index.js";

/**
 * Post comment function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const postComment = async (req, res) => {
  try {
    const username = JSON.parse(req.userData).username;
    const content = req.body.content;
    const replyId = req.body.replyId || null;
    const database = await db();
    const Comment = database.models.Comment;
    const lastestComment = await Comment.max("comment_id");
    await Comment.create({
      comment_id: lastestComment.comment_id + 1,
      user_name: username,
      content: content,
      reply_id: replyId,
    });
    res.send({ message: "Comment create successfully." });
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
export const getComment = () => {};
export const deleteComment = () => {};
