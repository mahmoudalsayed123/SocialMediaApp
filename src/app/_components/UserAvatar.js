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
        (res) => setUserInfo(res)
      );
    },
    [user?.primaryEmailAddress.emailAddress]
  );

  return (
    <div className="flex items-center gap-3">
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
              className="w-[45px] h-[45px] rounded-full border-2 border-slate-600"
              alt="avatar"
            />
          </Link>
          <div className="hidden lg:block flex-1 min-w-0">
            <h2 className="text-base font-semibold text-white truncate hover:text-violet-400 transition-colors cursor-pointer">
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
