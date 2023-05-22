import express from "express";
import { Category, validate } from "../models/category.js";
import { auth } from "../middlewares/auth.js";
import { admin } from "../middlewares/admin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const categorys = await Category.find();
  res.send(categorys);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.send(category);
});

router.post("/", [auth, admin], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const category = new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!category) return res.status(404).send("Category not found");
  res.send(category);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);
  if (!category) return res.status(404).send("Category not found");
  res.send(category);
});

export default router;
