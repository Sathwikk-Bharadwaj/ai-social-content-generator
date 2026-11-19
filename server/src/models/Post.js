import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Post",
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    platform: {
      type: String,
      enum: ["twitter", "linkedin", "instagram"],
      default: "twitter",
    },
    tone: {
      type: String,
      default: "witty",
    },
    status: {
      type: String,
      enum: ["draft", "review", "approved", "scheduled"],
      default: "draft",
    },
    scheduledTime: {
      type: String,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
