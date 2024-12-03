import React from "react";
import { FiMenu } from "react-icons/fi";

const ProfileLink = () => {
  return (
    <div className="mt-auto border-t pt-3 w-full text-sm flex justify-between    items-center gap-x-2">
      <div className="flex items-center gap-x-3">
        <img
          src="https://avatars.githubusercontent.com/u/148571945?v=4"
          className="w-10 h-10 rounded-md object-cover"
        />
        <div className="flex flex-col items-start justify-start">
          <span className="font-semibold">Berkan</span>
          <span>ozmberkan</span>
        </div>
      </div>
      <button>
        <FiMenu size={18} />
      </button>
    </div>
  );
};

export default ProfileLink;
