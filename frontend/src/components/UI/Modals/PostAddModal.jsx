import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbDoorExit, TbMoodSmile, TbPhoto } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAccount } from "~/hooks/useAccount";

import toast from "react-hot-toast";
import noAvatar from "~/assets/noavatar.jpg";
import { useDispatch } from "react-redux";
import { createPost } from "~/redux/slices/postsSlice";

const PostAddModal = ({ setPostModal }) => {
  const rootModal = document.getElementById("root-modal");

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useAccount();
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const createPostHandle = async (data) => {
    setLoading(true);
    try {
      const file = selectedPhoto[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
      formData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadedImage = await res.json();

      const formSendData = {
        content: data?.content,
        creatorId: user?._id,
        creatorUsername: user?.username,
        creatorName: user?.displayName,
        creatorImage: user?.photoURL ? user?.photoURL : "no-avatar",
        image: uploadedImage.secure_url,
      };

      dispatch(createPost(formSendData));
      toast.success("Gönderi başarıyla oluşturuldu.");
      setPostModal(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-5"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full justify-between items-center flex">
          <h2 className="text-xl font-semibold ">Yeni Gönderi Oluştur</h2>
          <button
            onClick={() => setPostModal(false)}
            className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>
        <div className="flex items-center gap-x-3">
          <img
            src={user?.photoURL ? user?.photoURL : noAvatar}
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col items-start justify-start">
            <span className="font-medium text-sm">{user?.displayName}</span>
            <span className="text-neutral-500 text-sm">@{user?.username}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit(createPostHandle)}>
          <div className="mb-4">
            <textarea
              {...register("content")}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none max-h-44 min-h-44 ring-2 ring-offset-2 ring-neutral-400"
              placeholder="Ne düşünüyorsun?"
              rows="4"
              cols="7"
            />
          </div>
          <div className="flex justify-start items-center">
            <div>
              <label
                htmlFor="file"
                className="flex items-center gap-x-2 cursor-pointer transition-colors duration-300 py-2 px-3 rounded-md hover:bg-primary/10"
              >
                <TbPhoto />
              </label>
              <input
                type="file"
                id="file"
                name="file"
                className="hidden"
                onChange={(e) => setSelectedPhoto(e.target.files)}
              />
            </div>
            <span className="ml-2 text-xs">
              {selectedPhoto && selectedPhoto[0]?.name.split(".").slice(0, 1)}
            </span>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg ml-auto"
            >
              {loading ? "Yükleniyor..." : "Gönder"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    rootModal
  );
};

export default PostAddModal;
