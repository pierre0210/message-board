import express from "express";
import { signIn, signUp } from "../controllers/authController.js";
import verifySignUp from "../middlewares/verifySignUp.js";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", verifySignUp, signUp);

export default router;
