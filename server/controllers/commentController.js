import db from "../models/index.js";
import { Op } from "sequelize";

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

/**
 * Get comments in range function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getCommentsInRange = async (req, res) => {
  try {
    const range = req.body.range;
    if (!range) {
      res.status(400).send({ message: "Range not provided" });
      return;
    }
    if (typeof range[0] != "number" || typeof range[1] != "number") {
      res.status(400).send({ message: "Wrong index data type" });
      return;
    }
    const database = await db();
    const Comment = database.models.Comment;
    const resultComments = await Comment.findAll({
      where: {
        comment_id: {
          [Op.between]: range,
        },
      },
      order: [["comment_id", "DESC"]],
    });
    res.send({
      message: "Comments found.",
      data: resultComments.map((comment) => comment.toJSON()),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

/**
 * Delete comment function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const deleteComment = async (req, res) => {
  try {
    const username = req.userData.username;
    const commentId = req.params.id;
    const database = await db();
    const Comment = database.models.Comment;
    const targetComment = await Comment.findOne({
      where: { comment_id: commentId },
    });
    if (!targetComment) {
      res.status(404).send({ message: "Comment not found." });
    } else if (targetComment.user_name != username) {
      res.status(403).send({ message: "Forbidden." });
    } else {
      await Comment.destroy({
        where: { comment_id: commentId },
      });
      res.send({ message: "Comment removed." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
