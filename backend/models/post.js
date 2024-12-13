const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    creatorUsername: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    creatorId: {
      type: String,
      required: true,
    },
    creatorImage: {
      type: String,
      required: true,
    },
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
