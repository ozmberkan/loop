import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "~/validation/schema";
import { regInputs } from "~/data/data";
import classNames from "classnames";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { registerService } from "~/redux/slices/usersSlice";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerHandle = async (data) => {
    try {
      await dispatch(registerService(data)).unwrap();
      toast.success("Tebrikler, kayıt başarılı. Yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="w-full flex justify-start items-start h-full">
      <div className="min-w-[30%] max-w-[30%] bg-login bg-cover h-full drop-shadow-2xl flex justify-center items-center">
        <h1 className="uppercase text-white drop-shadow-xl text-[190px] font-black  w-full  transform -rotate-90 ">
          kayıt ol
        </h1>
      </div>
      <div className="w-full h-full flex justify-center items-center flex-col ">
        <div className="w-[400px] h-[600px] flex justify-start items-start flex-col">
          <img src={Logo} className="w-28" />
          <form
            className=" h-[600px] w-full mt-4 flex flex-col gap-3.5"
            onSubmit={handleSubmit(registerHandle)}
          >
            {regInputs.map((input) => (
              <div key={input.id} className="flex flex-col gap-1">
                <label className="font-medium text-sm text-neutral-400">
                  {input.label}
                </label>
                <div
                  className={classNames(
                    "border px-4 h-12 rounded-xl w-full flex items-center justify-start gap-x-2",
                    errors[input.name] && "border-red-500"
                  )}
                >
                  <span className="pr-2 mr-2 border-r">
                    <input.icon size={20} className="text-primary" />
                  </span>
                  <input
                    className="h-full w-full outline-none text-sm"
                    type={input.type}
                    {...register(input.name)}
                    placeholder={input.placeholder}
                  />
                </div>
                <span className="text-xs text-red-500">
                  {errors[input.name] && errors[input.name].message}
                </span>
              </div>
            ))}

            <div className="w-full flex justify-end items-center ">
              <Link
                to="/login"
                className="text-sm hover:underline text-neutral-500"
              >
                Hesabın var mı?
              </Link>
            </div>

            <button className="px-4 py-2 rounded-lg font-medium w-full  bg-gradient-to-tr  hover:opacity-70 duration-200   to-primary from-sky-300  text-white">
              Kayıt ol
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
