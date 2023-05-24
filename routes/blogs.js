import express from "express";
import { admin } from "../middlewares/admin.js";
import { auth } from "../middlewares/auth.js";
import { Blog, validate } from "../models/blog.js";
import { Category } from "../models/category.js";

const router = express.Router();

// Get all post
router.get("/", async (req, res) => {
  const categoryId = req.query.categoryId;
  const searchText = req.query.searchText;
  if (categoryId && searchText) {
    const posts = await Blog.find({
      title: { $regex: searchText, $options: "i" },
      "category._id": categoryId,
    }).populate("author", "name avatar -_id");
    res.send(posts);
  }
  if (searchText && !categoryId) {
    const posts = await Blog.find({
      title: { $regex: searchText, $options: "i" },
    }).populate("author", "name avatar -_id");
    res.send(posts);
  }
  if (!searchText && categoryId) {
    const posts = await Blog.find({
      "category._id": categoryId,
    }).populate("author", "name avatar -_id");
    res.send(posts);
  } else {
    const allPosts = await Blog.find().populate("author", "name avatar -_id");
    res.send(allPosts);
  }
});

// Creating a post
router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = await Category.findById(req.body.categoryId);
  if (!category) return res.status(404).send("Category not Found");
  const post = await new Blog({
    title: req.body.title,
    thumbnail: req.body.thumbnail,
    category: {
      _id: category._id,
      name: category.name,
    },
    author: {
      _id: req.user._id,
    },
    content: req.body.content,
    like: req.body.like,
    comment: req.body.comment,
  }).populate("author", "name avatar -_id");
  await post.save();
  res.send(post);
});

// Get specific post by id
router.get("/:id", async (req, res) => {
  const post = await Blog.findById(req.params.id).populate(
    "author",
    "name avatar -_id"
  );
  if (!post) return res.status(404).send("Post not found.");
  res.send(post);
});

// Get specific post by id and update
router.put("/:id", auth, async (req, res) => {
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
    },
    {
      new: true,
    }
  );
  if (!post) return res.status(404).send("Post not found.");
  res.send(post);
});

// Get specific post by id and delete
router.delete("/:id", [auth, admin], async (req, res) => {
  const post = await Blog.findByIdAndRemove(req.params.id);
  res.send(post);
});

export default router;
