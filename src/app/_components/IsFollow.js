"use client";

import { useUser } from "@clerk/nextjs";
import { createFollow, getFollows, getUserByEmail } from "../_utils/postApi";
import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const IsFollow = ({ creator, className }) => {
  const pathName = usePathname();
  const [userId, setUserId] = useState(null);
  const [isFollow, setIsFollow] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    getUserByEmail(user.primaryEmailAddress.emailAddress).then((res) => {
      if (res?.length > 0) {
        setUserId(res[0].id);
      }
    });
  }, [user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (!userId) return;

    async function checkIsFollow() {
      const res = await getFollows(userId);

      if (res?.some((e) => e.followedId === creator.id)) {
        setIsFollow(true);
      }
    }

    checkIsFollow();
  }, [userId, creator.id]);

  async function handlefollowed() {
    if (!userId) return;

    const newFollow = {
      followerId: userId,
      followedId: creator.id,
    };

    await createFollow(newFollow);
    setIsFollow(!isFollow);
  }

  return (
    <button onClick={handlefollowed} className={className}>
      {pathName.includes("/profile") && (
        <Image
          src="/assets/icons/follow.svg"
          alt="follow"
          width={15}
          height={15}
        />
      )}
      {isFollow ? "UNFOLLOW" : "FOLLOW"}
    </button>
  );
};

export default IsFollow;
