import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import cors from "cors";
import posts from "./routes/blogs.js";
import users from "./routes/users.js";
import categorys from "./routes/categorys.js";
import comments from "./routes/comments.js";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/categorys", categorys);
app.use("/api/comments", comments);
app.use("/api/auth", auth);

mongoose
  .set("strictQuery", false)
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log(`Could not connected to MongoDB ${err}`));

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
