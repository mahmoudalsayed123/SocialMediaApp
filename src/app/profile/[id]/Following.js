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
    [follow?.followedId],
  );

  return (
    <Link
      className="block w-[350px] px-[10px] py-[8px]  cursor-pointer transition-all duration-300 rounded-lg  hover:bg-gray-800"
      href={`/profile/${userFollowedInfo?.id}`}
    >
      <div className="flex items-center gap-[20px]">
        {userFollowedInfo?.avatar ? (
          <Image
            src={userFollowedInfo?.avatar}
            width={500}
            height={500}
            alt="avatar"
            className="w-[50px] h-[50px] rounded-full"
          />
        ) : (
          <div className="w-[50px] h-[50px] rounded-full mb-3 bg-slate-600 animate-pulse"></div>
        )}
        <h3 className="text-lg font-bold">{userFollowedInfo?.userName}</h3>
      </div>
    </Link>
  );
}

export default Following;
