import express from "express";
import { Message, validate } from "../models/message.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await Message.find();
  res.send(messages);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const message = new Message({
    sender: req.body.sender,
    email: req.body.email,
    message: req.body.message,
  });
  await message.save();

  res.send(message);
});

router.delete("/:id", async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id);
  if (!message) return res.status(404).send("Category not found");
  res.send(message);
});

export default router;
