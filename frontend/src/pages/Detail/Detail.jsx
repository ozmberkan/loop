import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CommentBox from "~/components/Post/CommentBox";
import { useAccount } from "~/hooks/useAccount";
import { getPost } from "~/redux/slices/postsSlice";
import socket from "~/utils/socket";

const Detail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const user = useAccount();

  const { currentPost } = useSelector((store) => store.posts);

  const [comments, setComments] = useState(currentPost?.comments || []);

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (currentPost?.comments) {
      setComments(currentPost.comments);
    }
  }, [currentPost?.comments]);

  useEffect(() => {
    socket.on("commentUpdated", (data) => {
      if (data.postId === currentPost?._id) {
        setComments(data.comments);
      }
    });

    return () => {
      socket.off("commentUpdated");
    };
  }, [currentPost?._id]);

  const { register, handleSubmit } = useForm();

  const sendCommentHandle = async (data) => {
    try {
      const commentData = {
        creatorId: user._id,
        creatorName: user.displayName,
        creatorUsername: user.username,
        creatorImage: user.photoURL,
        comment: data.comment,
      };

      await axios.put(
        `${import.meta.env.VITE_MAIN_URL}/api/post/commentPost/${id}`,
        commentData
      );

      toast.success("Yorumunuz başarıyla gönderildi.");
    } catch (error) {
      console.error(error.message);
      toast.error(
        "Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    }
  };

  return (
    <div className="flex flex-col  h-full justify-start items-start p-5">
      <div className="w-full h-[400px]  flex items-start justify-start gap-x-5">
        <img
          src={currentPost?.image}
          className="h-full rounded-xl ring-2 ring-neutral-300 ring-offset-2"
        />
        <div className="flex flex-row justify-between items-start w-full p-3">
          <div className="flex flex-col">
            <h1 className="font-semibold text-xl">
              {currentPost?.creatorName}
            </h1>
            <h1 className="text-sm text-neutral-500">
              @{currentPost?.creatorUsername}
            </h1>
            <p className="mt-3">{currentPost?.content}</p>
          </div>
          <div>
            <img
              src={currentPost?.creatorImage}
              className="w-12 ring-2 ring-offset-2 ring-neutral-300 h-12 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
      <form
        className="w-full mt-12 flex flex-col gap-3"
        onSubmit={handleSubmit(sendCommentHandle)}
      >
        <h1 className="font-semibold text-xl text-primary">
          Gönderiye yorum yap.
        </h1>
        <div className="flex flex-col gap-3">
          <textarea
            {...register("comment")}
            placeholder="Gerçekten çok faydalı bir paylaşım olmuş."
            className="w-full border outline-none rounded-xl shadow-xl p-3 text-sm min-h-32 max-h-32"
          />
          <button className="px-4 py-2 rounded-md bg-primary text-white">
            Gönder
          </button>
        </div>
      </form>
      <div className="border-t w-full flex flex-col gap-5 py-5 ">
        {comments.map((comment) => (
          <CommentBox comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Detail;
