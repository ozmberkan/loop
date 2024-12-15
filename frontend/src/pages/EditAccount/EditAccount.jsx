import React, { useEffect, useState } from "react";
import { useAccount } from "~/hooks/useAccount";
import noAvatar from "~/assets/noavatar.jpg";
import noBanner from "~/assets/banner.jpg";
import { TbEditCircle } from "react-icons/tb";
import UserPhotoModal from "~/components/UI/Modals/UserPhotoModal";
import UserBannerModal from "~/components/UI/Modals/UserBannerModal";
import { AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { getUserById } from "~/redux/slices/usersSlice";
import UserEditModal from "~/components/UI/Modals/UserEditModal";

const EditAccount = () => {
  const user = useAccount();
  const [editPhoto, setEditPhoto] = useState(false);
  const [editBanner, setEditBanner] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {editPhoto && (
        <AnimatePresence>
          <UserPhotoModal setEditPhoto={setEditPhoto} />
        </AnimatePresence>
      )}
      {editBanner && (
        <AnimatePresence>
          <UserBannerModal setEditBanner={setEditBanner} />
        </AnimatePresence>
      )}
      {editUser && (
        <AnimatePresence>
          <UserEditModal setEditUser={setEditUser} />
        </AnimatePresence>
      )}
      <div className="w-full h-full flex flex-col">
        {/* Banner Section */}
        <div
          style={{
            backgroundImage: `url('${user?.bannerURL || noBanner}')`,
          }}
          className="w-full group bg-cover bg-center bg-no-repeat min-h-[200px] relative"
        >
          <button
            onClick={() => setEditBanner(true)}
            className="bg-black/25 hover:opacity-100 opacity-0 absolute inset-0 flex justify-center items-center transition-opacity"
          >
            <TbEditCircle size={40} color="white" />
          </button>
          <div className="z-50">
            {/* Profile Photo Section */}
            <div
              className="w-[200px] bg-white h-[200px] rounded-full object-cover absolute right-6 transform -translate-x-1/2 bottom-0 translate-y-1/2 border-white border-[7px]"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <img
                src={user?.photoURL || noAvatar}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-contain"
              />

              {hovered && (
                <button
                  onClick={() => setEditPhoto(true)}
                  className="w-full h-full bg-black/25 rounded-full absolute inset-0 flex justify-center items-center opacity-100 transition-opacity"
                >
                  <TbEditCircle size={40} color="white" />
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setEditUser(true)}
            className="px-4 py-1 rounded-md bg-primary shadow-xl text-white absolute top-3 left-3"
          >
            Profilini düzenlemek için tıkla
          </button>
        </div>
        {/* User Info Section */}
        <div className="w-full h-[200px] flex items-start justify-start flex-col p-4 border-b">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">{user?.displayName}</h1>
              <span className="text-xs text-neutral-400">
                @{user?.username}
              </span>
            </div>
            <p className="text-sm w-[700px]">
              {user?.bio || "Buralarda daha yeniyim!"}
            </p>
            <div className="flex items-center gap-x-2">
              <span className="text-sm">
                {user?.followers?.length || "0"} Takipçi
              </span>
              <span className="text-sm">
                {user?.following?.length || "0"} Takip Ediyor
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAccount;
