import React from "react";
import { TbEdit, TbEditCircle } from "react-icons/tb";
import Post from "~/components/Post/Post";
import { useAccount } from "~/hooks/useAccount";
import noAvatar from "~/assets/noavatar.jpg";
import noBanner from "~/assets/banner.jpg";

const MyAccount = () => {
  const user = useAccount();

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
          className="w-[200px] h-[200px] rounded-full object-contain absolute right-6 transform -translate-x-1/2 bottom-0 translate-y-1/2 border-white border-[7px]"
        />
        <button className="p-3 rounded-full bg-primary shadow-xl text-white absolute top-3 left-3">
          <TbEditCircle size={20} />
        </button>
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
        <Post />
      </div>
    </div>
  );
};

export default MyAccount;
