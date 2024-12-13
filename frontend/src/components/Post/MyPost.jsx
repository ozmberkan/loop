import React from "react";
import { TbEdit, TbHeart, TbMessage, TbTrash } from "react-icons/tb";
import { Link } from "react-router-dom";
import noAvatar from "~/assets/noavatar.jpg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getUserById } from "~/redux/slices/usersSlice";
import { getAllPost } from "~/redux/slices/postsSlice";

const MyPost = ({ post }) => {
  dayjs.extend(relativeTime);
  dayjs.locale("tr");

  const dispatch = useDispatch();

  const deletePostHandle = async (id) => {
    await axios.delete(
      `${import.meta.env.VITE_MAIN_URL}/api/post/deletePost/${id}`
    );
    toast.success("Post silindi.");
    dispatch(getAllPost());
  };

  return (
    <div className="w-full max-h-[700px] bg-white rounded-xl  shadow-md p-4 flex flex-col items-start justify-start gap-5">
      <img
        src={post.image}
        className="rounded-xl max-h-[400px] min-h-[400px] w-full object-cover shadow"
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
      <div className="w-full flex justify-between items-center  py-1 ">
        <div className="flex items-center gap-x-1">
          <button className="p-2 hover:bg-primary/20 rounded-full">
            <TbMessage size={20} className="text-primary" />
          </button>
          <span className="text-xs text-neutral-600">
            {post?.comments?.length}
          </span>
          <button className="p-2 hover:bg-primary/20 rounded-full  ">
            <TbHeart size={20} className="text-primary" />
          </button>
          <span className="text-xs text-neutral-600">
            {post?.likes?.length}
          </span>
        </div>
        <div className="flex items-center gap-x-2">
          <button
            onClick={() => deletePostHandle(post._id)}
            className="px-4 py-2 rounded-md bg-red-100 text-red-500 border border-red-500"
          >
            <TbTrash />
          </button>
          <button className="px-4 py-2 rounded-md bg-green-100 text-green-500 border border-green-500">
            <TbEdit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPost;
