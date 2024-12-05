import { motion } from "framer-motion";
import React from "react";
import { TbCheck } from "react-icons/tb";

import { CiStar } from "react-icons/ci";

const BePro = () => {
  return (
    <div className="bg-pro bg-cover w-full h-full flex justify-start flex-col gap-12 items-center relative p-12">
      <div className="flex flex-col gap-3 text-center">
        <h1 className="text-3xl font-bold">Pro'ya Yükselt</h1>
        <p className="text-neutral-800">
          Pro üyelik ile tüm özelliklere sınırsız erişim kazanın ve ayrıcalıklı
          içeriklerden yararlanın.
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-white rounded-xl shadow-2xl  w-[400px]  z-10 border overflow-hidden"
      >
        <div className="w-full bg-gradient-to-tr  to-primary from-sky-300 h-[7rem] flex justify-center items-center text-center flex-col gap-2  ">
          <h1 className="text-white font-bold text-2xl">Pro Üyelik</h1>
          <span className="text-[#cae4fc] text-sm ">
            Tüm özelliklere sınırsız erişim
          </span>
        </div>

        <div className="flex flex-col items-start justify-start text-center p-3">
          <h1 className="text-4xl font-semibold text-primary">
            ₺99 <span className="text-xs text-[#abd2f7]">/ay</span>
          </h1>
          <div className="flex flex-col mt-3 gap-5">
            <div className="flex items-center gap-x-2 ">
              <TbCheck className="text-green-500" />
              <span className="text-sm">Reklamsız deneyim</span>
            </div>
            <div className="flex items-center gap-x-2 ">
              <TbCheck className="text-green-500" />
              <span className="text-sm">Özel içeriklere erişim</span>
            </div>
            <div className="flex items-center gap-x-2 ">
              <TbCheck className="text-green-500" />
              <span className="text-sm">7/24 öncelikli destek</span>
            </div>
            <div className="flex items-center gap-x-2 ">
              <TbCheck className="text-green-500" />
              <span className="text-sm">Özel profil rozeti</span>
            </div>
            <div className="flex items-center gap-x-2 ">
              <TbCheck className="text-green-500" />
              <span className="text-sm">Erken erişim özellikleri</span>
            </div>
          </div>
          <button className="px-4 py-2 rounded-md w-full mt-12 bg-gradient-to-tr  hover:opacity-70 duration-200   to-primary from-sky-300  text-white">
            Hemen Başla
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BePro;
