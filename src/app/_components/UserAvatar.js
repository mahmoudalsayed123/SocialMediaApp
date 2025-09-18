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
    <div className="lg:flex gap-[8px] lg:px-[20px] lg:py-[10px]">
      {userInfo?.avatar ? (
        <>
          <Link href={`/profile/${userInfo?.id}`}>
            {userInfo?.avatar ? (
              <Image
                src={userInfo?.avatar}
                width={500}
                height={500}
                className="w-[60px] h-[50px] lg:w-[50px] lg:h-[50px] rounded-full mt-[15px] lg:mt-0"
                alt="avatar"
              />
            ) : (
              <div className="w-[40px] h-[40px] rounded-full animate-pulse bg-slate-600"></div>
            )}
          </Link>
          <h2 className="hidden lg:block text-xl font-semibold italic ms-[5px] text-nowrap">
            {userInfo?.userName}
          </h2>
        </>
      ) : (
        <SkeletonUserButton />
      )}
    </div>
  );
}

export default UserAvatar;
