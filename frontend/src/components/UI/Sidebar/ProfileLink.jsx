import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { TbDoorExit, TbEditCircle } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { logoutService } from "~/redux/slices/usersSlice";
import toast from "react-hot-toast";
import { useAccount } from "~/hooks/useAccount";
import noAvatar from "~/assets/noavatar.jpg";

const ProfileLink = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = useAccount();

  const dispatch = useDispatch();

  const exit = () => {
    toast.success("Çıkış Yapılıyor...");
    setTimeout(() => {
      dispatch(logoutService());
      window.location.reload();
    }, 2000);
  };

  return (
    <div className="mt-auto border-t pt-3 w-full text-sm flex justify-between    items-center gap-x-2">
      <div className="flex items-center gap-x-3 relative">
        <img
          src={user?.photoURL ? user?.photoURL : noAvatar}
          className="w-9 h-9 rounded-md object-cover"
        />
        <div className="flex flex-col items-start justify-start">
          <span className="font-semibold text-xs">{user?.displayName}</span>
          <span>{user?.username}</span>
        </div>
      </div>

      <AnimatePresence>
        <Popover className="">
          <PopoverButton
            onClick={() => setIsOpen(true)}
            className="outline-none hover:bg-primary/30 hover:text-primary p-3 rounded-full"
          >
            <FiMenu size={18} />
          </PopoverButton>
          <Transition
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <PopoverPanel
              anchor="top end"
              className="flex flex-col gap-2 bg-white w-[200px] border shadow-xl rounded-md -mt-3 p-2"
            >
              <Link className="hover:bg-primary/10 p-2 rounded text-sm flex items-center gap-x-3">
                <TbEditCircle />
                Profili Düzenle
              </Link>
              <button
                onClick={exit}
                className="bg-red-200 outline-none p-2 rounded-md text-sm text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 flex items-center gap-x-3"
              >
                <TbDoorExit />
                Çıkış Yap
              </button>
            </PopoverPanel>
          </Transition>
        </Popover>
      </AnimatePresence>
    </div>
  );
};

export default ProfileLink;
