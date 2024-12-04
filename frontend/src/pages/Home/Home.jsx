import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import Post from "~/components/Post/Post";
import PostAddModal from "~/components/UI/Modals/PostAddModal";

const Home = () => {
  const [postModal, setPostModal] = useState(false);

  return (
    <>
      <AnimatePresence>
        {postModal && <PostAddModal setPostModal={setPostModal} />}
      </AnimatePresence>
      <div className="w-full  p-5 overflow-auto ">
        <div className="flex justify-end items-center w-full mb-3">
          <button
            onClick={() => setPostModal(true)}
            className="font-semibold bg-primary/10 px-4 py-1 rounded-full text-primary border border-primary"
          >
            Gönderi Oluştur
          </button>
        </div>
        <div className="grid grid-cols-2 gap-10">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
};

export default Home;
