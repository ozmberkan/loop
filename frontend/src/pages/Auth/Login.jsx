import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "~/assets/logo.svg";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "~/validation/schema";
import { logInputs } from "~/data/data";
import classNames from "classnames";
import { loginService } from "~/redux/slices/usersSlice";
import toast from "react-hot-toast";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandle = async (data) => {
    try {
      await dispatch(loginService(data)).unwrap();
      toast.success("Tebrikler, giriş başarılı. Yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="w-full flex justify-start items-start h-full">
      <div className="min-w-[30%] max-w-[30%] bg-login bg-cover h-full drop-shadow-2xl flex justify-center items-center"></div>
      <div className="w-full h-full flex justify-center items-center flex-col relative ">
        <div className="w-[400px] h-[600px] flex justify-start items-start flex-col">
          <img src={Logo} className="w-28 my-5 absolute top-3 right-7 drop-shadow-xl" />
          <h1 className="font-extrabold text-primary text-4xl">Oturum aç</h1>
          <p className="text-sm font-medium text-neutral-500 my-2">
            Bilgilerini girerek loop'a ulaşabilir, keşfetmeye başlayabilirsin.
          </p>
          <form
            className=" h-[600px] w-full mt-4 flex flex-col gap-3.5"
            onSubmit={handleSubmit(loginHandle)}
          >
            {logInputs.map((input) => (
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

            <div className="w-full flex justify-between items-center ">
              <Link
                to="/forgot-password"
                className="text-sm hover:underline text-neutral-500"
              >
                Parolamı Unuttum
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
