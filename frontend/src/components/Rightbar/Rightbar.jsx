import React from "react";
import { FiSearch } from "react-icons/fi";
import Pro from "../UI/Rightbar/Pro";
import { Link } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

const Rightbar = ({ isOpen }) => {
  return (
    <div
      className={`
         h-full bg-white border-l shadow-lg
        transform transition-all duration-500  ease-in-out
        ${isOpen ? "w-80" : "w-0"}
      `}
      style={{ overflow: isOpen ? "visible" : "hidden" }}
    >
      <div
        className={`
          flex flex-col items-start justify-start gap-4 p-5
          ${isOpen ? "opacity-100" : "opacity-0"}
          transition-opacity duration-300
        `}
      >
        {isOpen && (
          <>
            <form className="w-full">
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
            <div className="h-full bg-neutral-100 w-full rounded-md flex justify-center items-center text-sm text-neutral-600 shadow">
              Reklam Panosu
            </div>
            <div className="mt-auto w-full">
              <Link
                className="
                  w-full px-4 py-2 text-sm flex gap-x-2 rounded-md bg-zinc-50 font-semibold text-neutral-500 border
                  hover:bg-zinc-100 justify-between items-center
                "
              >
                Daha fazlası için tıklayın
                <IoIosMore size={20} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
