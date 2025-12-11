"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { getAllUserInfoByEmail } from "../_utils/postApi";
import Image from "next/image";
import Link from "next/link";
import SkeletonUserButton from "./SkeletonUserButton";

function UserAvatar() {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useUser();

  useEffect(
    function () {
      getAllUserInfoByEmail(user?.primaryEmailAddress.emailAddress).then(
        (res) => setUserInfo(res),
      );
    },
    [user?.primaryEmailAddress.emailAddress],
  );

  return (
    <div className="flex items-center gap-3 md:mb-[30px]">
      {userInfo?.avatar ? (
        <>
          <Link
            href={`/profile/${userInfo?.id}`}
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={userInfo?.avatar}
              width={500}
              height={500}
              className="w-[40px] h-[40px] md:w-[45px] md:h-[45px] rounded-full border-2 border-slate-600"
              alt="avatar"
            />
          </Link>
          <div className="hidden md:block flex-1 min-w-0">
            <h2 className="text-lg font-bold mb-[10px] text-white truncate hover:text-violet-400 transition-colors cursor-pointer">
              {userInfo?.userName}
            </h2>
          </div>
        </>
      ) : (
        <SkeletonUserButton />
      )}
    </div>
  );
}

export default UserAvatar;
