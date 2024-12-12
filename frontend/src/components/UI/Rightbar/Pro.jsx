import React from "react";
import { Link } from "react-router-dom";

const Pro = () => {
  return (
    <div className="p-3  font-geist rounded-xl h-[150px] w-full bg-premium bg-opacity-1  bg-center bg-cover flex flex-col gap-3 shadow-xl">
      <div className="flex flex-col">
        <h1 className="font-extrabold text-white text-2xl ">Pro'ya geç!</h1>
        <p className="text-xs font-bold mt-2 text-neutral-100">
          Hemen yılbaşı indiriminden yararlanın ve pro'ya geçin!
        </p>
      </div>
      <div className="mt-2">
        <Link
          to="upgrade-to-pro"
          className="bg-primary text-white  text-sm font-semibold px-4 py-2 rounded-xl "
        >
          Detay
        </Link>
      </div>
    </div>
  );
};

export default Pro;
