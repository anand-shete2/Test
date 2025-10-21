const Blog = require("../models/blog.model");
const { redis } = require("../config/redis");

const getAllBlogs = async (req, res) => {
  try {
    const cachedBlogs = await redis.get("blogs");
    if (cachedBlogs) {
      return res.status(200).json({ blogs: JSON.parse(cachedBlogs) });
    }

    // query the database if not in cachne
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(3);

    // store in cache
    await redis.set("blogs", JSON.stringify(blogs), "EX", 300);
    return res.status(200).json({ blogs });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error while getting all Blogs" });
  }
};

module.exports = { getAllBlogs };
