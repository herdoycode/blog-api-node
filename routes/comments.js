import express from "express";
import { Comment } from "../models/comment.js";
import { Blog } from "../models/blog.js";

const router = express.Router();

router.get("/:postId", async (req, res) => {
  const comments = await Comment.find({
    postId: req.params.postId,
  }).populate({ path: "user", select: "name avatar" });
  res.send(comments);
});

router.post("/", async (req, res) => {
  const comment = new Comment({
    postId: req.body.postId,
    user: req.body.userId,
    text: req.body.text,
  });
  await comment.save();
  const post = await Blog.findById(req.body.postId);
  post.comment.push(comment);
  await post.save();
  res.send(comment);
});

router.delete("/:id", async (req, res) => {
  const comment = await Comment.findByIdAndRemove(req.params.id);
  if (!comment) return res.status(404).send("Category not found");
  res.send(comment);
});

export default router;
