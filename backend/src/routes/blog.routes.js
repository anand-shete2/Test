const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const Blog = require("../models/blog.model");
const sanitizeHtml = require("sanitize-html");
const { putObjectForBlog } = require("../config/aws");
const { GoogleGenAI } = require("@google/genai");
const { redis } = require("../config/redis");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.get("/generate-signed-url", async (req, res) => {
  try {
    const url = await putObjectForBlog();
    if (!url) return res.status(500).json({ message: "Error generating Signed URL" });

    return res.status(201).json({ message: "Generated Pre-signed URL", url });
  } catch (error) {
    return res.status(500).json({ message: "Error generating Signed URL" });
  }
});

router.post("/add", async (req, res) => {
  try {
    const { title, content, _id: userId, coverImageURL } = req.body;
    if (!title || !content || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "height", "width"],
      },
    });

    const { _id } = await User.findById(userId).select("_id").lean();
    if (!_id) return res.status(404).json({ message: "User doesn't exists" });

    await Blog.create({
      title,
      content: sanitizedContent,
      createdBy: _id,
      coverImageURL,
    });

    // update the cache
    redis.del("blogs");
    return res.status(201).json({ message: "Blog Added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
});

router.post("/edit/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) return res.status(400).json({ message: "Params not sent properly" });

    const { title, content, _id: userId, coverImageURL } = req.body;
    if (!title || !content || !userId)
      return res.status(400).json({ message: "All fields are required" });

    const sanitizedContent = sanitizeHtml(content, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "height", "width"],
      },
    });

    const user = await User.findById(userId).select("_id").lean();
    if (!user) return res.status(404).json({ message: "User doesn't exists" });

    await Blog.updateOne(
      { _id: blogId },
      {
        title,
        content: sanitizedContent,
        createdBy: user._id,
        coverImageURL,
      }
    );

    redis.del("blogs");
    return res.status(200).json({ message: "Blog Modified successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
});

router.delete("/delete/:blogId", async (req, res) => {
  try {
    const blogId = req.params.blogId;
    if (!blogId) return res.status(400).json({ message: "Params not sent properly" });

    await Blog.deleteOne({ _id: blogId });
    return res.status(200).json({ message: "Blog Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while adding Blog" });
  }
});

router.post("/improve", async (req, res) => {
  try {
    const { content, title } = req.body;
    if (!content) return res.status(400).json({ message: "No content receicved" });

    const prompt = `
    Given the blog title and raw blog body content, improve the grammar, clarity, and overall writing style. Maintain the original meaning.
    Return the result strictly in clean **Markdown format**. 
    Do NOT return HTML or wrap content in code blocks.
    
    Blog Title:
    ${title}
    
    Blog Content:
    ${content}
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        temperature: 0.3,
        topP: 0.9,
        topK: 40,
      },
    });

    return res.status(200).json({
      message: "successful",
      content: response.text,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      messsage: "Failed to improve text using AI",
    });
  }
});

router.get("/getBlogs/:userId", async (req, res) => {
  try {
    const userId = req.params?.userId;
    if (!userId) {
      return res.status(404).json({ message: "Params not received" });
    }

    const user = await User.findOne({ _id: userId }).lean();
    if (!user) return res.status(404).json({ message: "User not found" });

    const blogs = await Blog.find({ createdBy: user._id }).sort({ createdAt: 1 }).lean();
    return res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching blogs of user" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("createdBy")
      .populate("comments.createdBy");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    return res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Blog not found" });
  }
});

router.post("/comment/add/:blogId", async (req, res) => {
  try {
    const { content, createdBy } = req.body;
    if (!content || !createdBy) return res.status(400).json({ message: "All fields are required" });

    const blogId = req.params?.blogId;
    if (!blogId) return res.status(404).json({ message: "Params not passed" });

    const blog = await Blog.findById(blogId).select("comments").lean();
    if (!blog) return res.status(404).json({ message: "Blog Not Found" });

    await Blog.updateOne(
      { _id: blogId },
      {
        $push: {
          comments: { content, blogId, createdBy },
        },
      }
    );

    const updated = await Blog.findById(blogId)
      .select("comments")
      .lean()
      .populate("comments.createdBy");
    const reversed = updated.comments.reverse();

    return res.status(200).json({ message: "Comment added successfully ", comments: reversed });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error Adding Comment" });
  }
});
module.exports = router;
