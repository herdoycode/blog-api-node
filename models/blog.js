import Joi from "joi";
import mongoose from "mongoose";
import { categorySchema } from "./category.js";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    category: {
      type: categorySchema,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    like: {
      type: Number,
    },
    comment: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

export const validate = (post) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    thumbnail: Joi.string().required(),
    categoryId: Joi.string().required(),
    content: Joi.string().required(),
    like: Joi.number(),
    comment: Joi.array(),
  });
  return schema.validate(post);
};

export const Blog = mongoose.model("Blog", postSchema);
