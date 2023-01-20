import db from "../models/index.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default async (req, res, next) => {
  if (req.body.username === "" || req.body.password === "") {
    res.status(400).send({ message: "User name and password can't be empty." });
    return;
  }
  try {
    const database = await db();
    const User = database.models.User;
    const userFound = await User.findOne({
      where: { user_name: req.body.username },
    });
    if (userFound) {
      res.status(400).send({ message: "User name is already in use." });
      return;
    }
  } catch (err) {
    res.status(500).send({ message: err });
    return;
  }

  next();
};
