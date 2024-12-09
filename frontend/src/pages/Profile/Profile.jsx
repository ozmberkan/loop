import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserByIdService } from "~/redux/slices/usersSlice";
import noAvatar from "~/assets/noavatar.jpg";
import noBanner from "~/assets/banner.jpg";
import { TbEditCircle } from "react-icons/tb";
import Post from "~/components/Post/Post";
import { useAccount } from "~/hooks/useAccount";

const Profile = () => {
  const { id } = useParams();

  const user = useAccount();

  const { currentUser } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [validUser, setValidUser] = useState(currentUser?._id !== user?._id);

  useEffect(() => {
    dispatch(getUserByIdService(id));
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
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
          className="w-[200px] h-[200px] rounded-full object-contain absolute right-6 transform -translate-x-1/2 bottom-0 translate-y-1/2 border-white border-[7px]"
        />
        {!validUser && (
          <button className="px-4 py-1 rounded-full bg-primary shadow-xl text-white absolute top-3 left-3">
            Takip et
          </button>
        )}
      </div>
      <div className="w-full  h-[200px] flex items-start justify-start flex-col p-4 border-b">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              {currentUser?.displayName}
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
