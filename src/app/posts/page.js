import React from "react";
import Posts from "./Posts";
import FollowsPage from "./FollowsPage";

async function PostsSection({ searchParams }) {
  const filter = await searchParams;
  return (
    <div className="italic px-[10px] py-[30px] md:py-[50px] flex-col justify-between lg:grid lg:grid-cols-2 gap-5 lg:gap-0">
      <Posts filter={filter} />

      <div className="lg:ms-[100px]">
        <FollowsPage />
      </div>
    </div>
  );
}

export default PostsSection;
