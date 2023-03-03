import express from "express";
import bcrypt from "bcrypt";
import Joi from "joi";
import { User } from "../models/user.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid user or password");

  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send("Invalid user or password");

  const token = user.generateAuthToken();

  res.send(token);
});

const validate = (user) => {
  const schema = Joi.object({
    email: Joi.string().min(5).max(200).email().required(),
    password: Joi.string().min(8).max(1000).required(),
  });
  return schema.validate(user);
};

export default router;
