import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import commentRouter from "./routes/commentRoute.js";
import authRouter from "./routes/authRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const originHost = process.env.ORIGIN || "http://localhost:3000";

app.use(cors({ origin: originHost }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/comment", commentRouter);
app.use("/api/auth", authRouter);

app.listen(port, () => {
  console.log(`Server is now running on ${port}`);
});
