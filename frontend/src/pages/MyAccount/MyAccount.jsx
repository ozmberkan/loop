import React, { useEffect } from "react";
import { TbEdit, TbEditCircle } from "react-icons/tb";
import Post from "~/components/Post/Post";
import { useAccount } from "~/hooks/useAccount";
import noAvatar from "~/assets/noavatar.jpg";
import noBanner from "~/assets/banner.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, resetPost } from "~/redux/slices/postsSlice";
import { ring } from "ldrs";
import { getUserById, resetUser } from "~/redux/slices/usersSlice";
import { Link } from "react-router-dom";
const MyAccount = () => {
  const user = useAccount();
  ring.register();
  const dispatch = useDispatch();

  const { posts, status } = useSelector((state) => state.posts);
  const { status: userStatus } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(resetPost());
    dispatch(resetUser());
    dispatch(getMyPosts(user._id));
    dispatch(getUserById(user._id));
  }, [user._id]);

  if (status === "loading" || userStatus === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div
        style={{
          backgroundImage: `url('${
            user?.bannerURL ? user?.bannerURL : noBanner
          }')`,
        }}
        className="w-full bg-cover bg-center bg-no-repeat min-h-[200px] relative"
      >
        {/* Profil resmi */}
        <img
          src={user?.photoURL ? user?.photoURL : noAvatar}
          className="w-[200px]  h-[200px] rounded-full object-cover absolute right-6 transform -translate-x-1/2 bottom-0 translate-y-1/2 border-white border-[7px]"
        />
      </div>
      <div className="w-full  h-[200px] flex items-start justify-start flex-col p-4 border-b">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">{user?.displayName}</h1>
            <span className="text-xs text-neutral-400">@{user?.username}</span>
          </div>
          <p className="text-sm w-[700px]">
            {user?.bio ? user?.bio : "Buralarda daha yeniyim!"}
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-sm">
              {user?.followers?.length ? user?.followers?.length : "0"} Takipçi
            </span>
            <span className="text-sm">
              {user?.following?.length ? user?.following?.length : "0"} Takip
              Ediyor
            </span>
          </div>
        </div>
      </div>
      <div className="w-full p-5 grid grid-cols-2 gap-5">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default MyAccount;
