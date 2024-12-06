import React from "react";
import { TbEdit, TbEditCircle } from "react-icons/tb";
import Post from "~/components/Post/Post";

const MyAccount = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div
        style={{
          backgroundImage:
            "url('https://pbs.twimg.com/profile_banners/704375542221557760/1652889855/1500x500')",
        }}
        className="w-full  min-h-[200px] relative"
      >
        {/* Profil resmi */}
        <img
          src="https://avatars.githubusercontent.com/u/148571945?v=4"
          className="w-[200px] h-[200px] rounded-full object-contain absolute right-6 transform -translate-x-1/2 bottom-0 translate-y-1/2 border-white border-[7px]"
        />
        <button className="p-3 rounded-full bg-primary shadow-xl text-white absolute top-3 left-3">
          <TbEditCircle size={20} />
        </button>
      </div>
      <div className="w-full  h-[200px] flex items-start justify-start flex-col p-4 border-b">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">Berkan Özmen</h1>
            <span className="text-xs text-neutral-400">@ozmberkan</span>
          </div>
          <p className="text-sm w-[700px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio
            officia magni eaque dicta placeat eum vel est. Reprehenderit
            exercitationem quibusdam eius rerum quasi architecto nihil?.
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-sm">30 Takipçi</span>
            <span className="text-sm">25 Takip Ediyor</span>
          </div>
        </div>
      </div>
      <div className="w-full p-5 grid grid-cols-2 gap-5">
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default MyAccount;
