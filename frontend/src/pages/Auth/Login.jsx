import React from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="w-full flex justify-start items-start h-full">
      <div className="min-w-[30%] max-w-[30%] bg-login bg-cover h-full drop-shadow-2xl flex justify-center items-center">
        <h1 className="uppercase text-white drop-shadow-xl text-[190px] font-black  w-full  transform -rotate-90 ">
          giriş yap
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col ">
        <div className="w-[400px] h-[600px] flex justify-start items-start flex-col">
          <img src={Logo} className="w-28" />
          <form className=" h-[600px] w-full mt-4 flex flex-col gap-3.5">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-neutral-400">
                E-Posta
              </label>
              <div className="border px-4 h-14 rounded-xl w-full flex items-center justify-start gap-x-2">
                <span className="pr-2 mr-2 border-r">
                  <FiMail size={20} className="text-primary" />
                </span>
                <input
                  className="h-full w-full outline-none text-sm"
                  type="email"
                  placeholder="E-Postanızı giriniz.."
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-neutral-400">
                Parola
              </label>
              <div className="border px-4 h-14 rounded-xl w-full flex items-center justify-start gap-x-2">
                <span className="pr-2 mr-2 border-r">
                  <FiLock size={20} className="text-primary" />
                </span>
                <input
                  className="h-full w-full outline-none text-sm"
                  type="password"
                  placeholder="Parolanızı giriniz.."
                />
              </div>
            </div>

            <div className="w-full flex justify-between items-center ">
              <Link className="text-sm hover:underline text-neutral-500">
                Şifremi Unuttum
              </Link>
              <Link
                to="/register"
                className="text-sm hover:underline text-neutral-500"
              >
                Hesabın yok mu?
              </Link>
            </div>

            <button className="px-4 py-2 rounded-lg font-medium w-full  bg-gradient-to-tr  hover:opacity-70 duration-200   to-primary from-sky-300  text-white">
              Oturum aç
            </button>

            <div className="w-full h-px bg-neutral-300 my-3 relative">
              <div className="absolute transform -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2 bg-white px-4 text-sm text-neutral-500">
                YA DA
              </div>
            </div>

            <button className="border px-4 py-2 rounded-lg hover:shadow-md transition-all duration-200 text-base text-neutral-500 flex items-center gap-x-3 justify-center">
              <FcGoogle size={20} />
              Google ile devam et
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
