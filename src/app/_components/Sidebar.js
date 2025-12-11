"use client";
import React, { useEffect, useState } from "react";
import { getUserByEmail } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";

import NavMobile from "./NavMobile";
import NavPc from "./NavPc";

function Sidebar() {
  const [userId, setUserId] = useState(null);

  const { user } = useUser();

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress.emailAddress).then((res) => {
        if (res.length > 0) {
          setUserId(res[0].id);
        }
      });
    },
    [user?.primaryEmailAddress.emailAddress],
  );

  const linkes = [
    {
      id: 0,
      name: "Home",
      route: "/posts",
      url: "/assets/icons/home.svg",
    },
    {
      id: 1,
      name: "Profile",
      route: `/profile/${userId}`,
      url: "/assets/icons/people.svg",
    },
    {
      id: 3,
      name: "Saved",
      route: "/saves",
      url: "/assets/icons/save.svg",
    },
    {
      id: 4,
      name: "Create Post",
      route: "/addPost",
      url: "/assets/icons/add-post.svg",
    },
  ];

  return (
    <div className="md:h-screen px-[20px] pt-[20px] md:pt-0 md:me-[20px]">
      <NavMobile linkes={linkes} />
      <NavPc linkes={linkes} />
    </div>
  );
}

export default Sidebar;
