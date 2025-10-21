const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    coverImageURL: {
      type: String,
      default: "https://anandshete-blogify.s3.ap-south-1.amazonaws.com/default/blog-image.webp",
    },
    comments: [
      {
        _id: false,
        content: { type: String },
        blogId: { type: mongoose.Schema.Types.ObjectId },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blogs", blogSchema);
module.exports = Blog;
