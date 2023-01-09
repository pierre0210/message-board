import db from "../models/index.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async (req, res, next) => {
  try {
    const database = await db();
    const User = database.models.User;
    const userFound = await User.findOne({
      where: { user_name: req.body.username },
    });
    const isExisted = userFound ? true : false;
    if (isExisted) {
      res.status(400).send({ message: "User name is already in use." });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }

  next();
};
