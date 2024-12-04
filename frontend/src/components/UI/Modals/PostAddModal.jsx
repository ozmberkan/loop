import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TbDoorExit, TbMoodSmile, TbPhoto } from "react-icons/tb";
import { IoClose } from "react-icons/io5";

import { useForm } from "react-hook-form";

const PostAddModal = ({ setPostModal }) => {
  const rootModal = document.getElementById("root-modal");

  const { register, handleSubmit } = useForm();

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
            src="https://avatars.githubusercontent.com/u/148571945?v=4"
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col items-start justify-start">
            <span className="font-semibold text-sm">@ozmberkan</span>
          </div>
        </div>
        <form>
          <div className="mb-4">
            <textarea
              className="w-full border border-gray-300 rounded-lg p-2 outline-none max-h-44 min-h-44 ring-2 ring-offset-2 ring-neutral-400"
              placeholder="Ne düşünüyorsun?"
              rows="4"
              cols="7"
            ></textarea>
          </div>
          <div className="flex justify-start items-center">
            <div>
              <label
                htmlFor="file"
                className="flex items-center gap-x-2 cursor-pointer transition-colors duration-300 py-2 px-3 rounded-md hover:bg-primary/10"
              >
                <TbPhoto />
              </label>
              <input type="file" id="file" name="file" className="hidden" />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg ml-auto"
            >
              Oluştur
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>,
    rootModal
  );
};

export default PostAddModal;
