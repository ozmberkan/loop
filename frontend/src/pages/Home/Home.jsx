import { AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Post from "~/components/Post/Post";
import PostAddModal from "~/components/UI/Modals/PostAddModal";
import { usePosts } from "~/hooks/usePosts";
import { getAllPost } from "~/redux/slices/postsSlice";

const Home = () => {
  const [postModal, setPostModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPost());
  });

  const posts = usePosts();
  return (
    <>
      <AnimatePresence>
        {postModal && <PostAddModal setPostModal={setPostModal} />}
      </AnimatePresence>
      <div className="w-full  p-5 overflow-auto ">
        <div className="flex justify-start pb-3 border-b items-center w-full mb-3">
          <button
            onClick={() => setPostModal(true)}
            className="font-semibold bg-primary/10 px-4 py-1 rounded-full text-primary border border-primary"
          >
            Gönderi Oluştur
          </button>
        </div>
        <div className="grid grid-cols-2 gap-10">
          {posts.map((post) => (
            <Post post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
