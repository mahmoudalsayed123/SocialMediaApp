// "use client";

// import { useUser } from "@clerk/nextjs";
import { getAllUserInfoByEmail, getFollows } from "../_utils/postApi";
// import { useEffect, useState } from "react";
import { currentUser } from "@clerk/nextjs/server";
import BtnIsFollow from "./BtnIsFollow";

const IsFollow = async ({ creator }) => {
  const user = await currentUser();
  const userId = await getAllUserInfoByEmail(
    user?.primaryEmailAddress.emailAddress
  );
  const follows = await getFollows(userId?.id);
  const followsArr = follows.find((e) => creator.id === e.followedId);
  const isFollow = followsArr?.followedId === creator.id;

  // const [userId, setUserId] = useState(null);
  // const [isFollow, setIsFollow] = useState(false);
  // const { user } = useUser();

  // useEffect(
  //   function () {
  //     getAllUserInfoByEmail(user?.primaryEmailAddress.emailAddress).then(
  //       (res) => setUserId(res.id)
  //     );

  //     getFollows(userId).then((res) => {
  //       const x = res.find((e) => creator.id === e.followedId);
  //       setIsFollow(x.followedId === creator.id);
  //     });
  //   },
  //   [user?.primaryEmailAddress.emailAddress, userId, creator]
  // );

  // function handlefollowed() {
  //   if (userId) {
  //     const newFollow = {
  //       followerId: userId,
  //       followedId: creator?.id,
  //     };
  //     createFollow(newFollow, userId);
  //   }
  // }

  return <BtnIsFollow isFollow={isFollow} creator={creator} userId={userId} />;
};

export default IsFollow;
