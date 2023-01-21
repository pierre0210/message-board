import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    res.status(401).send({ message: "Access Token not found." });
    return;
  } else {
    try {
      const data = jwt.verify(accessToken, process.env.JWTSECRET);
      req.userData = data;
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid access token." });
      return;
    }
  }
};
