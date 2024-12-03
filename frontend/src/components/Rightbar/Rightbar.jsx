import React from "react";
import { FiSearch } from "react-icons/fi";
import Pro from "../UI/Rightbar/Pro";

const Rightbar = () => {
  return (
    <div className="min-w-80 max-w-64 p-5 flex flex-col items-start justify-start border-r gap-4 border-l draggable-container">
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
    </div>
  );
};

export default Rightbar;
