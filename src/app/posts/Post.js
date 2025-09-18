"use client";
import Image from "next/image";
import React, { Suspense, useEffect, useState } from "react";
import { getUserByid } from "../_utils/postApi";
import Like from "../_components/Like";
import SavedPost from "../_components/SavedPost";
import Link from "next/link";
import SkeletonPost from "./SkeletonPost";

function Post({ post }) {
  const [userPost, setUserPost] = useState({});

  useEffect(() => {
    if (post?.userPostId) {
      getUserByid(post.userPostId).then((data) => {
        setUserPost(data);
      });
    }
  }, [post?.userPostId]);

  return (
    <div className=" px-[30px] py-[15px] rounded-lg">
      {post ? (
        <>
          <div className="flex items-center gap-3 mb-6">
            <div>
              <Link href={`/profile/${userPost?.id}`}>
                {userPost?.avatar ? (
                  <Image
                    src={userPost?.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[50px] h-[50px] "
                  />
                ) : (
                  <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </Link>
            </div>

            <div>
              <h2 className="text-lg lg:text-xl lg:ms-[5px] font-bold mb-5">
                {userPost?.userName}
              </h2>
              <p className="text-sm">{userPost?.created}</p>
            </div>
          </div>

          <div>
            <p className="ms-5 mb-5 text-lg lg:text-xl lg:mb-[30px] tracking-wide leading-8">
              {post.text}
            </p>
            <div>
              {post?.content ? (
                <Image
                  src={post.content}
                  width={500}
                  height={500}
                  alt="content"
                  className=" rounded-lg lg:max-h-[600px]"
                />
              ) : (
                <div className=" rounded-lg ms-[10px] w-[500px] h-[400px] animate-pulse bg-slate-600"></div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-[30px] text-2xl ms-[8px] lg:ms-0 lg:w-[520px]">
            <Like postUserId={post?.id} />

            <div className="cursor-pointer w-[70px] h-[40px] transition-all duration-300 flex justify-center items-center ">
              <SavedPost postUserId={post?.id} />
            </div>
          </div>
        </>
      ) : (
        <SkeletonPost />
      )}
    </div>
  );
}

export default Post;
