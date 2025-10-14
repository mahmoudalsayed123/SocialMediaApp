"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addLike, getLikes, getUserByEmail } from "../_utils/postApi";

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
    [user?.primaryEmailAddress?.emailAddress]
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
      className="cursor-pointer transition-all duration-300 flex justify-center items-center"
    >
      {isClicked ? (
        <FaHeart className="text-red-600 text-3xl" />
      ) : (
        <FaRegHeart className="text-3xl" />
      )}
    </div>
  );
}

export default Like;
