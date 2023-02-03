import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import models from "../models/index.js";

dotenv.config();
const User = models.user;

/**
 * Sign in function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const signIn = async (req, res) => {
  try {
    const userFound = await User.findOne({
      where: { user_name: req.body.username },
    });
    if (!userFound) {
      res.status(401).send({ message: "Wrong user name or password!" });
    } else {
      const isMatch = await bcrypt.compare(req.body.password, userFound.password);
      if (isMatch) {
        const token = jwt.sign({ username: req.body.username }, process.env.JWTSECRET, { expiresIn: "12h" });
        res.send({ message: "Sign in successfully", accessToken: token });
      } else {
        res.status(401).send({ message: "Wrong user name or password!" });
      }
    }
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

/**
 * Sign up function
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const signUp = async (req, res) => {
  try {
    await User.create({
      user_name: req.body.username,
      password: bcrypt.hashSync(req.body.password),
    });
    res.send("User was created successfully");
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
