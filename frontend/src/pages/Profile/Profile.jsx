import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getUserById,
  getUserByIdService,
  resetUser,
  updateUser,
} from "~/redux/slices/usersSlice";
import noAvatar from "~/assets/noavatar.jpg";
import noBanner from "~/assets/banner.jpg";
import logo from "~/assets/admin.svg";
import { TbEditCircle } from "react-icons/tb";
import Post from "~/components/Post/Post";
import { useAccount } from "~/hooks/useAccount";
import { ring } from "ldrs";
import axios from "axios";
import toast from "react-hot-toast";
import { MdVerified } from "react-icons/md";

import { Tooltip } from "react-tooltip";

const Profile = () => {
  const { id } = useParams();
  ring.register();

  const user = useAccount();

  const { currentUser, status } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const validUser = currentUser?._id !== user?._id;

  const include = user?.following?.includes(currentUser?._id);

  const isMe = validUser ? false : true;

  useEffect(() => {
    dispatch(resetUser());
    dispatch(getUserByIdService(id));
  }, []);

  const followUser = async (currentUser) => {
    if (include) {
      axios.put(
        `http://localhost:5858/api/auth/updateUser/${user._id}`,
        { following: user.following.filter((f) => f !== currentUser._id) },
        { withCredentials: true }
      );

      axios.put(
        `http://localhost:5858/api/auth/updateUser/${currentUser._id}`,
        { followers: currentUser.followers.filter((f) => f !== user._id) },
        { withCredentials: true }
      );

      dispatch(getUserByIdService(currentUser._id));
      dispatch(getUserById(user._id));

      toast.success(`Başarıyla @${currentUser.username} takipten çıkarıldı.`);
      return;
    }

    try {
      await axios.put(
        `http://localhost:5858/api/auth/updateUser/${user._id}`,
        { following: [...user.following, currentUser._id] },
        { withCredentials: true }
      );

      await axios.put(
        `http://localhost:5858/api/auth/updateUser/${currentUser._id}`,
        { followers: [...currentUser.followers, user._id] },
        { withCredentials: true }
      );
      toast.success(`@${currentUser.username} başarıyla takip edildi.`);

      dispatch(getUserByIdService(currentUser._id));
      dispatch(getUserById(user._id));
    } catch (error) {
      console.log(error);
    }
  };

  if (status === "loading") {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <l-ring size="40" stroke="5" bg-opacity="0" speed="2" color="black" />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <Tooltip id="admin" className="z-50" />
      <div
        style={{
          backgroundImage: `url('${
            currentUser?.bannerURL ? currentUser?.bannerURL : noBanner
          }')`,
        }}
        className="w-full bg-cover bg-center bg-no-repeat min-h-[200px] relative"
      >
        {/* Profil resmi */}
        <img
          src={currentUser?.photoURL ? currentUser?.photoURL : noAvatar}
          className="w-[200px] h-[200px] rounded-full object-cover absolute right-6 transform -translate-x-1/2 bottom-0 translate-y-1/2 border-white border-[7px]"
        />
        {!isMe && (
          <button
            onClick={() => followUser(currentUser)}
            className="px-4 py-1 rounded-full bg-primary shadow-xl text-white absolute top-3 left-3"
          >
            {include ? "Takipten Çık" : "Takip Et"}
          </button>
        )}
      </div>
      <Tooltip id="my-tooltip" />

      <div className="w-full  h-[200px] flex items-start justify-start flex-col p-4 border-b">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold flex items-center gap-x-2">
              {currentUser?.displayName}
              {currentUser?.premium && (
                <MdVerified
                  className="fill-primary"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Pro özelliklerine sahip!"
                />
              )}
              {user?.role === "admin" && (
                <img
                  src={logo}
                  className="w-5"
                  data-tooltip-id="admin"
                  data-tooltip-content="Loop Admin"
                />
              )}
            </h1>
            <span className="text-xs text-neutral-400">
              @{currentUser?.username}
            </span>
          </div>
          <p className="text-sm w-[700px]">
            {currentUser?.bio ? currentUser?.bio : "Buralarda daha yeniyim!"}
          </p>
          <div className="flex items-center gap-x-2 ">
            <span className="text-sm">
              {currentUser?.followers?.length
                ? currentUser?.followers?.length
                : "0"}{" "}
              Takipçi
            </span>
            <span className="text-sm">
              {currentUser?.following?.length
                ? currentUser?.following?.length
                : "0"}{" "}
              Takip Ediyor
            </span>
          </div>
        </div>
      </div>
      <div className="w-full p-5 grid grid-cols-2 gap-5">
        Yapım Aşamasında...
      </div>
    </div>
  );
};

export default Profile;
