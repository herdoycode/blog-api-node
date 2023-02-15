import express from "express";
import { Blog, validate } from "../models/blog.js";
import { Category } from "../models/category.js";
import { User } from "../models/user.js";

const router = express.Router();

// Get all post
router.get("/", async (req, res) => {
  const posts = await Blog.find();
  res.send(posts);
});

// Creating a post
router.post("/", async (req, res) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Category not Found");
  const author = await User.findById(req.body.authorId);
  if (!author) return res.status(404).send("Author not Found");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const post = new Blog({
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    category: {
      _id: category._id,
      name: category.name,
    },
    author: {
      name: author.name,
      avatar: author.avatar,
    },
    content: req.body.content,
    like: req.body.like,
    comment: req.body.comment,
  });
  await post.save();
  res.send(post);
});

// Get specific post by id
router.get("/:id", async (req, res) => {
  const post = await Blog.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found.");
  res.send(post);
});

// Get specific post by id and update
router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Category not Found");
  const post = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      thumbnail: req.body.thumbnail,
      category: {
        _id: category._id,
        name: category.name,
      },
      content: req.body.content,
      like: req.body.like,
      comment: req.body.comment,
    },
    {
      new: true,
    }
  );
  if (!post) return res.status(404).send("Post not found.");
  res.send(post);
});

// Get specific post by id and delete
router.delete("/:id", async (req, res) => {
  const posts = await Blog.findByIdAndRemove(req.params.id);
  res.send(posts);
});

export default router;
