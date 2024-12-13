import { AnimatePresence } from "framer-motion";
import { ring } from "ldrs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "~/components/Post/Post";
import PostAddModal from "~/components/UI/Modals/PostAddModal";
import { useAccount } from "~/hooks/useAccount";
import { usePosts } from "~/hooks/usePosts";
import { getAllPost } from "~/redux/slices/postsSlice";
import { getUserById } from "~/redux/slices/usersSlice";

const Home = () => {
  const [postModal, setPostModal] = useState(false);
  const dispatch = useDispatch();

  const user = useAccount();
  ring.register();
  useEffect(() => {
    dispatch(getAllPost());
    dispatch(getUserById(user._id));
  }, []);

  const posts = usePosts();

  const { status } = useSelector((state) => state.posts);

  if (status === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black" />
      </div>
    );
  }

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
          {posts.length > 0 ? (
            posts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="grid-cols-2 bg-primary/20 text-primary border-primary px-4 py-2 rounded-lg border">
              Herhangi bir gönderi bulunamadı!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
