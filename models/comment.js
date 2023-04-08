import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
