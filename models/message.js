import mongoose from "mongoose";
import Joi from "joi";

export const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      maxLength: 200,
      required: true,
    },
    email: {
      type: String,
      minLength: 5,
      maxLength: 200,
      required: true,
    },
    message: {
      type: String,
      minLength: 10,
      maxLength: 3000,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("Message", messageSchema);

export const validate = (message) => {
  const schema = Joi.object({
    sender: Joi.string().max(200).required().label("Name"),
    email: Joi.string().min(5).max(300).email().required(),
    message: Joi.string().min(10).max(3000).required(),
  });
  return schema.validate(message);
};
