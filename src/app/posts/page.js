import React from "react";
import Posts from "./Posts";
import FollowsPage from "./FollowsPage";

async function PostsSection({ searchParams }) {
  const filter = await searchParams;
  return (
    <>
      <div className="italic px-[10px] sm:px-[20px] lg:px-[50px] lg:ms-[-150px] py-[30px] sm:py-[40px] lg:py-[65px] flex-col justify-between lg:col-span-2 lg:grid lg:grid-cols-2 gap-5 lg:gap-0">
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
