"use client";
import { getUserByid } from "@/app/_utils/postApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Following({ follow }) {
  const [userFollowedInfo, setUserFollowedInfo] = useState([]);

  useEffect(
    function () {
      getUserByid(follow?.followedId).then((res) => setUserFollowedInfo(res));
    },
    [follow?.followedId]
  );

  return (
    <div className="flex items-center gap-[20px] lg:ps-[25px] lg:py-[20px] lg:w-[700px] cursor-pointer transition-all duration-300 rounded-lg  hover:bg-gray-900">
      <Link href={`/profile/${userFollowedInfo?.id}`}>
        {userFollowedInfo?.avatar ? (
          <Image
            src={userFollowedInfo?.avatar}
            width={500}
            height={500}
            alt="avatar"
            className="w-[70px] h-[70px] rounded-full"
          />
        ) : (
          <div className="w-[50px] h-[50px] rounded-full mb-3 bg-slate-600 animate-pulse"></div>
        )}
      </Link>
      <h3 className="text-xl font-bold">{userFollowedInfo?.userName}</h3>
    </div>
  );
}

export default Following;
