const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getMyPosts,
} = require("../controllers/post.js");

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getMyPosts/:id", getMyPosts);

module.exports = router;
