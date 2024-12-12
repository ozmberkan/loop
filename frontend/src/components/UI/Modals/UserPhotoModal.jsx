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
import {
  getUserById,
  getUserByIdService,
  updateUser,
} from "~/redux/slices/usersSlice";

const UserPhotoModal = ({ setEditPhoto }) => {
  const rootModal = document.getElementById("root-modal");

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = useAccount();
  const dispatch = useDispatch();

  const updateProfilePhoto = async (e) => {
    e.preventDefault();
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

      const userData = {
        ...user,
        photoURL: uploadedImage.secure_url,
      };

      dispatch(updateUser({ data: userData, user: user }));
      toast.success("Profil fotoğrafı başarıyla güncellendi.");
      setEditPhoto(false);
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
          <h2 className="text-xl font-semibold ">
            Profil Fotoğrafını Güncelle
          </h2>
          <button
            onClick={() => setEditPhoto(false)}
            className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={updateProfilePhoto}>
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
              {selectedPhoto && selectedPhoto[0].name}
            </span>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg ml-auto"
            >
              {loading ? "Yükleniyor..." : "Güncelle"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    rootModal
  );
};

export default UserPhotoModal;
