import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { TbPhoto } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { useAccount } from "~/hooks/useAccount";

import toast from "react-hot-toast";
import noAvatar from "~/assets/noavatar.jpg";
import { useDispatch } from "react-redux";
import { updateUser } from "~/redux/slices/usersSlice";
import { useForm } from "react-hook-form";

const UserEditModal = ({ setEditUser }) => {
  const rootModal = document.getElementById("root-modal");

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useAccount();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio,
    },
  });

  const dispatch = useDispatch();

  const updateProfile = async (data) => {
    setLoading(true);
    try {
      const userData = {
        ...user,
        displayName: data.displayName,
        bio: data.bio,
      };

      dispatch(updateUser({ data: userData, user: user }));
      toast.success("Profil başarıyla güncellendi.");
      setEditUser(false);
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
          <h2 className="text-xl font-semibold ">Profilini Güncelle</h2>
          <button
            onClick={() => setEditUser(false)}
            className="p-2 hover:bg-neutral-100 rounded-md transition-colors"
          >
            <IoClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(updateProfile)}>
          <div className="flex flex-col justify-start items-start gap-4">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-neutral-500">İsim Soyisim</label>
              <input
                {...register("displayName")}
                className="px-4 py-2 rounded-md border w-full"
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm text-neutral-500">Biyografi</label>
              <input
                {...register("bio")}
                className="px-4 py-2 rounded-md border w-full"
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-primary hover:bg-sky-600 text-white px-4 py-2 rounded-lg ml-auto"
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

export default UserEditModal;
