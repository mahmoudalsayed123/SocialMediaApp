"use client";

import { createFollow } from "../_utils/postApi";

const BtnIsFollow = ({ isFollow, userId, creator }) => {
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
    <button
      onClick={handlefollowed}
      className="bg-violet-400 rounded-lg  px-[20px] py-[6px] text-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-violet-500"
    >
      {isFollow ? "UNFOLLOW" : "FOLLOW"}
    </button>
  );
};

export default BtnIsFollow;
