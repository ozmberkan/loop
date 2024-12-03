import React from "react";
import { IoIosSnow } from "react-icons/io";
import { Link } from "react-router-dom";

const Pro = () => {
  return (
    <div className="p-3 rounded-xl h-[150px] w-full bg-premium bg-opacity-1  bg-center bg-cover flex flex-col gap-3 shadow-xl">
      <div className="flex flex-col">
        <h1 className="font-extrabold text-neutral-700 text-2xl">
          Pro'ya geç!
        </h1>
        <p className="text-xs font-bold mt-2 text-neutral-700">
          Hemen{" "}
          <strong className="bg-clip-text text-transparent bg-gradient-to-r from-[#28543C] to-[#AF261C] relative ">
            yılbaşı
            <span className="text-neutral-700 absolute -top-0.5 -right-1">
              <IoIosSnow />
            </span>
          </strong>{" "}
          indiriminden yararlanın ve pro'ya geçin!
        </p>
      </div>
      <div className="mt-2">
        <Link className="bg-primary text-white border text-sm font-semibold px-4 py-2 rounded-xl ">
          Detay
        </Link>
      </div>
    </div>
  );
};

export default Pro;
