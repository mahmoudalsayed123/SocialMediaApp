import Image from "next/image";
import React from "react";
import Like from "../../_components/Like";
import SavedPost from "../../_components/SavedPost";
import Link from "next/link";

function ProfileYourPost({ post }) {
  return (
    <Link
      className="block mb-[20px] sm:col-span-1 sm:w-[300px] sm:h-[300px] md:w-[250px] md:h-[250px] md:mb-0"
      href={`/posts/${post?.id}`}
    >
      {post?.content ? (
        <div className="relative sm:w-full sm:h-full md:w-full md:h-full">
          <Image
            src={post?.content || null}
            width={500}
            height={500}
            alt="post content"
            className="w-full h-full rounded-xl"
          />
          <div className="absolute bottom-[20px] left-[15px] cursor-pointer flex items-center gap-[10px]">
            <Like postUserId={post?.id} />
          </div>
          <div className="absolute bottom-[20px] right-[15px] cursor-pointer flex items-center gap-[10px]">
            <SavedPost postUserId={post?.id} />
          </div>
        </div>
      ) : (
        <div className="lg:mb-0 lg:col-span-1 rounded-lg bg-slate-600 animate-pulse"></div>
      )}
    </Link>
  );
}

export default ProfileYourPost;
