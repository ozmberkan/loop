const Post = require("../models/post.js");

const createPost = async (req, res) => {
  try {
    const {
      creatorId,
      creatorUsername,
      creatorName,
      creatorImage,
      content,
      image,
    } = req.body;

    const newPost = await Post.create({
      creatorId,
      creatorUsername,
      creatorImage,
      creatorName,
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

const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      console.log("Post veritabanında bulunamadı.");
      return res.status(404).json({ message: "Post bulunamadı." });
    }

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter((id) => id !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    const io = req.app.get("io");
    io.emit("likeUpdated", { postId: id, likes: post.likes });

    return res.status(200).json({
      message: "Like işlemi başarıyla tamamlandı.",
      likes: post.likes,
    });
  } catch (err) {
    console.error("Sunucu hatası:", err);
    return res.status(500).json({ message: "Sunucu hatası", error: err });
  }
};

const commentPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı." });
    }

    const { comment, creatorId, creatorName, creatorUsername, creatorImage } =
      req.body;

    if (!comment || !creatorId) {
      return res
        .status(400)
        .json({ message: "Eksik veya hatalı veri gönderildi." });
    }

    const newComment = {
      comment,
      creatorId,
      creatorName,
      creatorUsername,
      creatorImage,
      createdAt: new Date(),
    };

    post.comments.push(newComment);

    await post.save();

    const io = req.app.get("io");
    io.emit("commentUpdated", { postId: id, comments: post.comments });

    return res.status(201).json({
      message: "Yorum eklendi.",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: "Sunucu Hatası" + error });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getMyPosts,
  deletePost,
  likePost,
  getPostById,
  commentPost,
};
