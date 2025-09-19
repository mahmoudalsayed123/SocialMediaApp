"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addLike, getLikes, getUserByEmail } from "../_utils/postApi";

function Like({ postUserId }) {
  const { user } = useUser();

  const [userSessionId, setUserSessionId] = useState(null);

  const [allLikes, setAllLikes] = useState([]);

  const [isClicked, setIsClicked] = useState(false);

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress.emailAddress).then((res) =>
        setUserSessionId(res.id)
      );
    },
    [user?.primaryEmailAddress.emailAddress]
  );

  useEffect(
    function () {
      getLikes(postUserId).then((res) => {
        setAllLikes(res);
      });
    },
    [postUserId]
  );

  useEffect(
    function () {
      let isUserLikedPost = allLikes.find((e) => {
        setIsClicked(userSessionId === e.userId);
      });
    },
    [allLikes, userSessionId]
  );

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
