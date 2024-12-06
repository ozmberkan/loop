import React from "react";
import { Link } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { logInputs } from "~/data/data";
import classNames from "classnames";
import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Forgot = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendMailHandle = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5858/api/auth/forgot-password",
        data
      );
      console.log(response.data);
      toast.success("Şifre sıfırlama bağlantısı gönderildi.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="w-full flex justify-start items-start h-full">
      <div className="min-w-[30%] max-w-[30%] bg-login bg-cover h-full drop-shadow-2xl flex justify-center items-center">
        <h1 className="uppercase text-white drop-shadow-xl text-[190px] font-black  w-full  transform -rotate-90 ">
          yenile
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col ">
        <div className="w-[400px] h-[600px] flex justify-start items-start flex-col">
          <img src={Logo} className="w-28" />
          <form
            className=" h-[600px] w-full mt-4 flex flex-col gap-3.5"
            onSubmit={handleSubmit(sendMailHandle)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-neutral-400">
                E-Posta
              </label>
              <div
                className={classNames(
                  "border px-4 h-12 rounded-xl w-full flex items-center justify-start gap-x-2"
                )}
              >
                <span className="pr-2 mr-2 border-r">
                  <FiMail size={20} className="text-primary" />
                </span>
                <input
                  className="h-full w-full outline-none text-sm"
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="E-Posta giriniz.."
                />
              </div>
            </div>

            <div className="w-full flex justify-end items-center ">
              <Link
                to="/login"
                className="text-sm hover:underline text-neutral-500"
              >
                Hesabını biliyor musun?
              </Link>
            </div>

            <button className="px-4 py-2 rounded-lg font-medium w-full  bg-gradient-to-tr  hover:opacity-70 duration-200   to-primary from-sky-300  text-white">
              Gönder
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
