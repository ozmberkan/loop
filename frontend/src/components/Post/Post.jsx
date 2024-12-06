import React from "react";
import { TbHeart, TbMessage } from "react-icons/tb";
import { Link } from "react-router-dom";
import post1 from "~/assets/post2.jpg";

const Post = () => {
  return (
    <div className="w-full max-h-[700px] bg-white rounded-xl border shadow p-4 flex flex-col items-start justify-start gap-5">
      <img
        src={post1}
        className="rounded-xl max-h-[400px] w-full object-cover shadow"
      />
      <div className="flex items-center  gap-x-1 justify-between w-full">
        <Link
          to="/profile/ozmberkan"
          className="flex gap-x-2 hover:bg-neutral-100 p-2 rounded-md "
        >
          <img
            src="https://avatars.githubusercontent.com/u/148571945?v=4"
            className="w-10 h-10 rounded-md object-cover"
          />
          <div className="flex flex-col items-start justify-start -space-y-1">
            <h1 className="font-semibold">Berkan Özmen</h1>
            <span className="text-xs">@ozmberkan</span>
          </div>
        </Link>
        <span className="text-xs text-neutral-400">5.12.2024</span>
      </div>
      <div className="flex items-start justify-start">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum omnis
        repellat earum harum libero, natus inventore deleniti minus iusto
        reprehenderit.
      </div>
      <div className="w-full flex justify-start items-center gap-x-2 py-1 ">
        <button className="p-2 hover:bg-primary/20 rounded-full">
          <TbMessage size={20} className="text-primary" />
        </button>
        <span className="text-xs text-neutral-600">15</span>
        <button className="p-2 hover:bg-primary/20 rounded-full  ">
          <TbHeart size={20} className="text-primary" />
        </button>
        <span className="text-xs text-neutral-600">332</span>
      </div>
    </div>
  );
};

export default Post;
