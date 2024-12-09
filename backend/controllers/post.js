const Post = require("../models/post.js");

const createPost = async (req, res) => {
  try {
    const { creatorId, creatorUsername, creatorImage, content } = req.body;

    const newPost = await Post.create({
      creatorId,
      creatorUsername,
      creatorImage,
      content,
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

module.exports = { createPost, getAllPosts };
