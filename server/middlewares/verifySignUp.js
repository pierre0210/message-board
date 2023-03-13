import models from "../models/index.js";

const User = models.user;

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
    const userFound = await User.findOne({
      where: { user_name: req.body.username },
    });
    if (userFound) {
      res.status(400).send({ message: "User name is already in use." });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err });
    return;
  }

  next();
};
