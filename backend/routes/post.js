const express = require("express");
const router = express.Router();

const {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  likePost,
  getPostById,
  commentPost,
} = require("../controllers/post.js");

router.post("/createPost", createPost);
router.get("/getAllPosts", getAllPosts);
router.get("/getMyPosts/:id", getMyPosts);
router.delete("/deletePost/:id", deletePost);
router.put("/likePost/:id", likePost);
router.get("/getPost/:id", getPostById);
router.put("/commentPost/:id", commentPost);

module.exports = router;
