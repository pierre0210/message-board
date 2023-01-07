import express from "express";
import { signIn, signUp } from "../controllers/authController";

const router = express.Router();

router.post("/signin", signIn);
router.post("/signup", signUp);
