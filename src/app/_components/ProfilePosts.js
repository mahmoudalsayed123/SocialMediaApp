"use client";
import React, { useState } from "react";
import ProfileYourPost from "../profile/[id]/ProfileYourPost";
import Following from "../profile/[id]/Following";
import { IoImageOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";

const arr = [
  {
    id: 0,
    name: "Posts",
    category: "YourPosts",
    icons: <IoImageOutline className="text-violet-500 text-2xl" />,
  },
  {
    id: 1,
    name: "Likes",
    category: "LikedPosts",
    icons: <FaRegHeart className="text-violet-500 text-2xl" />,
  },
  {
    id: 2,
    name: "Following",
    category: "Followings",
    icons: <RiUserFollowLine className="text-violet-500 text-2xl" />,
  },
];

const ProfilePosts = ({ posts, postUserLiked, following }) => {
  const [yourPosts, setYourPosts] = useState(true);
  const [postsLiked, setPostsLiked] = useState(false);
  const [follow, setFollow] = useState(false);
  return (
    <div>
      <ul className="flex items-center gap-[10px] lg:gap-[30px] mb-[40px]">
        {arr.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              if (item.category === "YourPosts") {
                setYourPosts(true);
                setPostsLiked(false);
                setFollow(false);
              } else if (item.category === "LikedPosts") {
                setPostsLiked(true);
                setYourPosts(false);
                setFollow(false);
              } else if (item.category === "Followings") {
                setFollow(true);
                setYourPosts(false);
                setPostsLiked(false);
              }
            }}
            className="cursor-pointer  bg-gray-900 px-[10px] py-[8px] lg:px-[60px] lg:py-[14px] rounded-lg text-center"
          >
            <button className="cursor-pointer flex items-center gap-[10px]">
              {/* {item.category === "YourPosts" ? (
                    <IoImageOutline className="text-violet-500 text-2xl " />
                  ) : (
                    <FaRegHeart className="text-violet-500 text-2xl" />
                  )} */}
              {item.icons}
              <span className="text-lg font-semibold">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {yourPosts ? (
        <div className="flex-col justify-center items-center lg:grid lg:grid-cols-4 lg:gap-[30px]">
          {posts.map((post) => (
            <ProfileYourPost key={post.id} post={post} />
          ))}
        </div>
      ) : postsLiked ? (
        <div className="flex-col justify-center items-center lg:grid lg:grid-cols-4 lg:gap-[30px]">
          {postUserLiked.map((post) => (
            <ProfileYourPost key={post.id} post={post} />
          ))}
        </div>
      ) : follow ? (
        <div className="grid grid-cols-1 gap-[30px]">
          {following.map((follow) => (
            <Following key={follow.id} follow={follow} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfilePosts;
