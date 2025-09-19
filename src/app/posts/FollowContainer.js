"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  createFollow,
  getAllUserInfoByEmail,
  getFollows,
} from "../_utils/postApi";
import Link from "next/link";
import SkeletonFollow from "./SkeletonFollow";

function FollowContainer({ creator }) {
  const [userId, setUserId] = useState(null);
  const [isFollow, setIsFollow] = useState(false);
  const { user } = useUser();

  useEffect(
    function () {
      getAllUserInfoByEmail(user?.primaryEmailAddress.emailAddress).then(
        (res) => setUserId(res.id)
      );

      getFollows(userId).then((res) => {
        const x = res.find((e) => creator.id === e.followedId);
        setIsFollow(x.followedId === creator.id);
      });
    },
    [user?.primaryEmailAddress.emailAddress, userId, creator]
  );

  function handlefollowed() {
    if (userId) {
      const newFollow = {
        followerId: userId,
        followedId: creator?.id,
      };
      createFollow(newFollow, userId);
    }
  }

  return (
    <div className="col-span-1 flex-col justify-center items-center italic ">
      {creator?.avatar ? (
        <>
          <div className="flex-col justify-center items-center gap-[10px]">
            <Link href={`/profile/${creator.id}`}>
              {creator?.avatar ? (
                <Image
                  src={creator?.avatar || null}
                  alt="avatar"
                  width={200}
                  height={200}
                  className="w-[50px] h-[50px] rounded-full mb-3 ms-[10px]"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full mb-3 bg-slate-600 animate-pulse"></div>
              )}
            </Link>

            <h3 className="text-xl font-bold mb-[15px]">{creator.userName}</h3>
          </div>

          <button
            onClick={handlefollowed}
            className="bg-violet-400 rounded-lg  px-[20px] py-[6px] text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-violet-500"
          >
            {isFollow ? "UNFOLLOW" : "FOLLOW"}
          </button>
        </>
      ) : (
        <SkeletonFollow />
      )}
    </div>
  );
}

export default FollowContainer;
