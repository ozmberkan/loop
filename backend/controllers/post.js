const Post = require("../models/post.js");

const createPost = async (req, res) => {
  try {
    const { creatorId, creatorUsername, creatorImage, content, image } =
      req.body;

    const newPost = await Post.create({
      creatorId,
      creatorUsername,
      creatorImage,
      content,
      image,
    });

    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

const getMyPosts = async (req, res) => {
  try {
    const findPost = await Post.find({ creatorId: req.params.id });
    return res.status(200).json(findPost);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Post silindi." });
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

module.exports = { createPost, getAllPosts, getMyPosts, deletePost };
