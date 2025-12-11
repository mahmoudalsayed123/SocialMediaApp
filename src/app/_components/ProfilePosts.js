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
      <ul className="flex items-center gap-[20px] mb-[40px] ">
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
            className="cursor-pointer bg-gray-800 px-[10px] py-[5px] rounded-md text-center"
          >
            <button className="cursor-pointer flex items-center gap-[5px]">
              {item.icons}
              <span className="text-md font-semibold">{item.name}</span>
            </button>
          </li>
        ))}
      </ul>

      {yourPosts ? (
        <div className="sm:grid sm:grid-cols-2 sm:gap-[15px] lg:grid-cols-3 lg:gap-[60px]">
          {posts.map((post) => (
            <ProfileYourPost key={post.id} post={post} />
          ))}
        </div>
      ) : postsLiked ? (
        <div className="sm:grid sm:grid-cols-2 sm:gap-[15px] lg:grid-cols-3 lg:gap-[60px]">
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
