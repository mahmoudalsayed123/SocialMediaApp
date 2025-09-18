import Image from "next/image";
import React from "react";
import Like from "../../_components/Like";
import SavedPost from "../../_components/SavedPost";
import Link from "next/link";

function ProfileYourPost({ post }) {
  return (
    <Link className="block mb-[50px]" href={`/posts/${post?.id}`}>
      <div className="relative">
        {post?.content ? (
          <Image
            src={post?.content || null}
            width={500}
            height={500}
            alt="post content"
            className="w-full h-fit lg:w-[300px] lg:h-[300px] rounded-xl"
          />
        ) : (
          <div className="lg:mb-0 lg:col-span-1 rounded-lg bg-slate-600 animate-pulse"></div>
        )}
        <div className="absolute bottom-[20px] left-[15px] cursor-pointer flex items-center gap-[10px]">
          <Like postUserId={post?.id} />
        </div>
        <div className="absolute bottom-[20px] right-[20px] cursor-pointer flex items-center gap-[10px]">
          <SavedPost postUserId={post?.id} />
        </div>
      </div>
    </Link>
  );
}

export default ProfileYourPost;
