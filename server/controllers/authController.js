import bcrypt from "bcryptjs";
import db from "../models/index.js";

export const signIn = () => {};

/**
 * Sign up function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const signUp = async (req, res) => {
  try {
    const database = await db();
    const User = database.models.User;
    await User.create({
      user_name: req.body.username,
      password: bcrypt.hashSync(req.body.password),
    });
    res.send("User was created successfully");
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
