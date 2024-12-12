import React from "react";
import { FiSearch } from "react-icons/fi";
import Pro from "../UI/Rightbar/Pro";
import { Link } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

const Rightbar = () => {
  return (
    <div className="min-w-80 max-w-64 p-5 flex flex-col items-start justify-start border-r gap-4 border-l draggable-container fixed h-full top-0 right-0 bg-white">
      <form>
        <div className="flex items-center gap-x-2 border rounded-xl px-4 h-10">
          <span>
            <FiSearch />
          </span>
          <input
            type="text"
            className="h-full w-full outline-none"
            placeholder="Ara..."
          />
        </div>
      </form>
      <Pro />
      <div
        className="h-full bg-red-500 w-full rounded-md bg-cover bg-center bg-no-repeat border shadow-md"
        style={{
          backgroundImage:
            "url('https://markamutfagi.co/wp-content/uploads/2021/01/google-ads-v1-1280x720-1.jpg')",
        }}
      ></div>
      <div className="mt-auto w-full">
        <Link className="w-full px-4 py-2 text-sm flex gap-x-2 rounded-md bg-zinc-50 font-semibold text-neutral-500 border hover:bg-zinc-100 justify-between items-center">
          Daha fazlası için tıklayın
          <IoIosMore size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Rightbar;
