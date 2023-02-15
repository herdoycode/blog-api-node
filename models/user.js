import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 200,
      required: true,
    },
    email: {
      type: String,
      minLength: 5,
      maxLength: 200,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 1000,
      required: true,
    },
    avatar: {
      type: String,
    },
    idAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_KEY
  );
  return token;
};

export const User = mongoose.model("User", userSchema);

export const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().max(200).required(),
    email: Joi.string().min(5).max(200).email().required(),
    password: Joi.string().min(8).max(1000).required(),
    avatar: Joi.string(),
  });
  return schema.validate(user);
};
