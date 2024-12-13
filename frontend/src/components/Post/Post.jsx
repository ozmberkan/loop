import React from "react";
import { TbHeart, TbMessage } from "react-icons/tb";
import { Link } from "react-router-dom";
import noAvatar from "~/assets/noavatar.jpg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
import { useAccount } from "~/hooks/useAccount";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllPost } from "~/redux/slices/postsSlice";

const Post = ({ post }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("tr");

  const user = useAccount();

  const isLiked = post?.likes.includes(user._id);

  const dispatch = useDispatch();

  const likePostHandle = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_MAIN_URL}/api/post/likePost/${post._id}`,
        { userId: user._id }
      );
      dispatch(getAllPost());
    } catch (err) {
      console.error("Hata oluştu:", err);
    }
  };

  return (
    <div className="w-full max-h-[700px] bg-white rounded-xl  shadow-md p-4 flex flex-col items-start justify-start gap-5">
      <img
        src={post.image}
        className="rounded-xl max-h-[400px] w-full object-cover shadow"
      />
      <div className="flex items-center  gap-x-1 justify-between w-full">
        <Link
          to={`/profile/${post?.creatorId}`}
          className="flex gap-x-2 hover:bg-neutral-100 p-2 rounded-md "
        >
          <img
            src={
              post?.creatorImage === "no-avatar" ? noAvatar : post?.creatorImage
            }
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col items-start justify-start -space-y-1">
            <h1 className="font-semibold">{post?.creatorUsername}</h1>
            <span className="text-xs">@{post?.creatorUsername}</span>
          </div>
        </Link>
        <span className="text-xs text-neutral-400">
          {dayjs(post?.createdAt).fromNow()}
        </span>
      </div>
      <div className="flex items-start justify-start">{post?.content}</div>
      <div className="w-full flex justify-start items-center gap-x-2 py-1 ">
        <button className="p-2 hover:bg-primary/20 rounded-full">
          <TbMessage size={20} className="text-primary" />
        </button>
        <span className="text-xs text-neutral-600">
          {post?.comments?.length}
        </span>
        <button
          onClick={likePostHandle}
          className="p-2 hover:bg-primary/20 rounded-full "
        >
          <TbHeart
            size={20}
            className={`text-primary ${isLiked && "fill-primary"} `}
          />
        </button>
        <span className="text-xs text-neutral-600">{post?.likes?.length}</span>
      </div>
    </div>
  );
};

export default Post;
