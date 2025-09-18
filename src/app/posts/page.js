"use client";
import React from "react";
import Posts from "./Posts";
import FollowsPage from "./FollowsPage";
import SkeletonPost from "./SkeletonPost";

function PostsSection() {
  return (
    <div className="italic lg:ms-[-150px] lg:py-[65px] flex-col justify-between lg:col-span-2 lg:grid lg:grid-cols-2">
      <div className="lg:col-span-1">
        <h1 className="text-whtie text-3xl lg:text-5xl font-bold w-fit px-[20px] lg:px-0 mb-[40px]">
          Home Feed
        </h1>
        <Posts />
      </div>

      <div className="lg:col-span-1 lg:ms-[150px]">
        <FollowsPage />
      </div>
    </div>
  );
}

export default PostsSection;
