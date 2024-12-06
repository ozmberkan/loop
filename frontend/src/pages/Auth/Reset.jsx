import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLock } from "react-icons/fi";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import Logo from "~/assets/logo.svg";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const sendResetHandle = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Şifreler eşleşmiyor!");
      return;
    }

    if (data.password.length < 8) {
      setError("Şifre en az 8 karakter olmalıdır.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5858/api/auth/reset-password",
        {
          token,
          newPassword: data.password,
        }
      );

      toast.success("Şifreniz başarıyla sıfırlandı!");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Bir hata oluştu.");
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
            onSubmit={handleSubmit(sendResetHandle)}
          >
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-neutral-400">
                Parola
              </label>
              <div
                className={classNames(
                  "border px-4 h-12 rounded-xl w-full flex items-center justify-start gap-x-2"
                )}
              >
                <span className="pr-2 mr-2 border-r">
                  <FiLock size={20} className="text-primary" />
                </span>
                <input
                  className="h-full w-full outline-none text-sm"
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Parola giriniz.."
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-medium text-sm text-neutral-400">
                Parolayı Onaylayın
              </label>
              <div
                className={classNames(
                  "border px-4 h-12 rounded-xl w-full flex items-center justify-start gap-x-2"
                )}
              >
                <span className="pr-2 mr-2 border-r">
                  <FiLock size={20} className="text-primary" />
                </span>
                <input
                  className="h-full w-full outline-none text-sm"
                  type="password"
                  {...register("confirmPassword", { required: true })}
                  placeholder="Tekrar Parola Giriniz..."
                />
              </div>
            </div>

            <div className="w-full flex justify-end items-center ">
              <Link
                to="/login"
                className="text-sm hover:underline text-neutral-500"
              >
                Parolanı biliyor musun?
              </Link>
            </div>

            <button className="px-4 py-2 rounded-lg font-medium w-full  bg-gradient-to-tr  hover:opacity-70 duration-200   to-primary from-sky-300  text-white">
              Yenile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
