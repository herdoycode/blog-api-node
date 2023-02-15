import mongoose from "mongoose";
import Joi from "joi";

export const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 200,
    required: true,
  },
});

export const validate = (category) => {
  const schema = Joi.object({
    name: Joi.string().max(200).required(),
  });
  return schema.validate(category);
};

export const Category = mongoose.model("Category", categorySchema);
