"use client";

import { useUser } from "@clerk/nextjs";
import { createFollow, getFollows, getUserByEmail } from "../_utils/postApi";
import { useEffect, useState } from "react";
// import { currentUser } from "@clerk/nextjs/server";
// import BtnIsFollow from "./BtnIsFollow";

const IsFollow = ({ creator }) => {
  // const user = await currentUser();
  // const userId = await getAllUserInfoByEmail(
  //   user?.primaryEmailAddress.emailAddress
  // );
  // const follows = await getFollows(userId?.id);
  // const followsArr = follows.find((e) => creator.id === e.followedId);
  // const isFollow = followsArr?.followedId === creator.id;

  const [userId, setUserId] = useState(null);
  const [isFollow, setIsFollow] = useState(false);
  const { user } = useUser();

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress?.emailAddress).then((res) => {
        if (res.length > 0) {
          setUserId(res[0].id);
        }
      });

      async function checkIsFollow() {
        await getFollows(userId).then((res) => {
          const x = res.some((e) => e.followedId === creator.id);
          if (x) {
            setIsFollow(true);
            console.log("followed");
          }
          // setIsFollow(x.followedId === creator.id);
        });
      }

      checkIsFollow();
    },
    [user?.primaryEmailAddress.emailAddress, userId, creator.id]
  );

  async function handlefollowed() {
    if (userId) {
      const newFollow = {
        followerId: userId,
        followedId: creator?.id,
      };
      await createFollow(newFollow);
      setIsFollow(!isFollow);
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

export default IsFollow;
