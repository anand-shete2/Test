const { Router } = require("express");
const { getAllBlogs } = require("../controllers/base.controller");

const router = Router();

router.get("/blogs", getAllBlogs);

module.exports = router;
