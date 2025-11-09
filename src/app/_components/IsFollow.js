"use client";

import { useUser } from "@clerk/nextjs";
import { createFollow, getFollows, getUserByEmail } from "../_utils/postApi";
import { useEffect, useState } from "react";


const IsFollow = ({ creator }) => {

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
          }

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
