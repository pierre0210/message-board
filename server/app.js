import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

import apiRouter from "./routes/apiRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const originHost = process.env.ORIGIN || "http://localhost:3000";

app.use(cors({ origin: originHost }));
app.use("/api", apiRouter);
app.use("/api/auth");

app.listen(port, () => {
  console.log(`Server is now running on ${port}`);
});
