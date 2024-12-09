const express = require("express");
const router = express.Router();

const { createPost, getAllPosts } = require("../controllers/post.js");

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);

module.exports = router;
