"use client";

import { useState } from "react";
import { createFollow, getTopCreators } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";

const BtnIsFollow = ({ isFollow, userId, creator }) => {
  const [isFollowing, setIsFollowing] = useState(isFollow);

  const { user } = useUser();
  async function handlefollowed() {
    if (userId) {
      const newFollow = {
        followerId: creator.id,
        followedId: userId?.id,
      };
      await createFollow(newFollow, userId);
    }
  }
  return (
    <button
      onClick={handlefollowed}
      className="bg-violet-400 rounded-lg  px-[20px] py-[6px] text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-violet-500"
    >
      {isFollow ? "UNFOLLOW" : "FOLLOW"}
    </button>
  );
};

export default BtnIsFollow;
