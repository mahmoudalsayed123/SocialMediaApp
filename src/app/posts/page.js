import React from "react";
import Posts from "./Posts";
import FollowsPage from "./FollowsPage";

async function PostsSection({ searchParams }) {
  const filter = await searchParams;
  return (
    <>
      <div className="italic lg:ms-[-150px] lg:py-[65px] flex-col justify-between lg:col-span-2 lg:grid lg:grid-cols-2">
        <div className="lg:col-span-1">
          <Posts filter={filter} />
        </div>

        <div className="lg:col-span-1 lg:ms-[150px]">
          <FollowsPage />
        </div>
      </div>
    </>
  );
}

export default PostsSection;
