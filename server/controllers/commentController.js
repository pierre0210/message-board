import models from "../models/index.js";
//import { Op } from "sequelize";

const Comment = models.comment;

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
    const userData = req.userData;
    const commentId = req.params.id;
    const resultComment = await Comment.findOne({
      where: { comment_id: commentId },
    });
    if (!resultComment) {
      res.status(404).send({ message: "Comment not found." });
      return;
    }
    res.send({
      message: "Comment found.",
      data: resultComment.toJSON(),
      userData: userData,
    });
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
    const range = [parseInt(req.query.start), parseInt(req.query.end)];
    const userData = req.userData;
    if (!range) {
      res.status(400).send({ message: "Range not provided" });
      return;
    }
    if (isNaN(range[0]) || isNaN(range[1])) {
      res.status(400).send({ message: "Wrong index data type" });
      return;
    }
    const resultComments = await Comment.findAll({
      offset: range[0] - 1,
      limit: range[1] - range[0],
      order: [["createdAt", "DESC"]],
    });
    res.send({
      message: "Comments found.",
      data: resultComments.map((comment) => comment.toJSON()),
      userData: userData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};

/**
 * Get comment count function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const getCommentCount = async (req, res) => {
  try {
    const count = await Comment.count();
    res.send({ message: "Counted.", data: count });
  } catch (err) {
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

/**
 * Edit comment function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const editComment = async (req, res) => {
  try {
    const username = req.userData.username;
    const commentId = req.params.id;
    const updateContent = req.body.content;
    const targetComment = await Comment.findOne({
      where: { comment_id: commentId },
    });
    if (!targetComment) {
      res.status(404).send({ message: "Comment not found." });
    } else if (targetComment.user_name != username) {
      res.status(403).send({ message: "Forbidden." });
    } else {
      targetComment.set({
        content: updateContent,
      });
      await targetComment.save();
      res.send({ message: "Content updated successfully." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
  }
};
