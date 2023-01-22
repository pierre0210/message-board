import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export default (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send({ message: "Access Token not found." });
    return;
  } else {
    try {
      let accessToken = authorization;
      if (accessToken.startsWith("Bearer ")) {
        accessToken = accessToken.split("Bearer ")[1];
      }
      const data = jwt.verify(accessToken, process.env.JWTSECRET);
      req.userData = data;
      next();
    } catch (err) {
      res.status(401).send({ message: "Invalid access token." });
      return;
    }
  }
};
