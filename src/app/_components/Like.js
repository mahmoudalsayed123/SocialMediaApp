"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addLike, getLikes, getUserByEmail } from "../_utils/postApi";
import Image from "next/image";

function Like({ postUserId }) {
  const { user } = useUser();
  const [userSessionId, setUserSessionId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress?.emailAddress).then((res) => {
        if (res.length > 0) {
          setUserSessionId(res[0].id);
        }
      });
    },
    [user?.primaryEmailAddress?.emailAddress],
  );

  useEffect(() => {
    if (userSessionId) {
      getLikes(userSessionId).then((res) => {
        if (res.length > 0) {
          const isPostLiked = res.find((like) => like.postId === postUserId);
          if (isPostLiked) {
            setIsClicked(true);
          }
        }
      });
    }
  }, [user?.primaryEmailAddress?.emailAddress, userSessionId, postUserId]);

  function handleAddLike() {
    setIsClicked((e) => !e);
    const newLike = {
      postId: postUserId,
      userId: userSessionId,
    };

    addLike(newLike, userSessionId);
  }

  return (
    <div
      onClick={handleAddLike}
      className="cursor-pointer transition-all duration-300 flex justify-center items-center hover:scale-110 active:scale-95 group"
    >
      {isClicked ? (
        <Image
          src="/assets/icons/liked.svg"
          alt="like"
          width={25}
          height={25}
        />
      ) : (
        <Image src="/assets/icons/like.svg" alt="like" width={25} height={25} />
      )}
    </div>
  );
}

export default Like;
