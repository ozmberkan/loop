const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  likePost,
} = require("../controllers/post.js");

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getMyPosts/:id", getMyPosts);
router.delete("/deletePost/:id", deletePost);
router.put("/likePost/:id", likePost);

module.exports = router;
