"use client";
import React, { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

import { usePathname, useRouter } from "next/navigation";
import Profile from "./profile/[id]/page";
import { createUser } from "./_utils/postApi";

import PostsSavePage from "./saves/page";
import PostsSection from "./posts/page";
import AddPost from "./addPost/page";
import EditProfile from "./editProfile/page";

function Home() {
  const pathName = usePathname();

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (pathName === "/") {
      router.push("/posts");
    }
  }, [pathName, router]);

  useEffect(
    function () {
      if (user) {
        const newUser = {
          userName: user?.firstName,
          email: user?.primaryEmailAddress.emailAddress,
          avatar: user?.imageUrl,
        };
        createUser(newUser).then().then();
      }
    },
    [user]
  );

  return (
    <>
      <div className="lg:px-[50px]">
        <div>{pathName === "/posts" && <PostsSection />}</div>

        {pathName === "/addPost" && <AddPost />}
        {pathName === "/profile/:id" && <Profile />}
        {pathName === "/saves" && <PostsSavePage />}
        {pathName === "/editeProfile" && <EditProfile />}
      </div>
    </>
  );
}

export default Home;
