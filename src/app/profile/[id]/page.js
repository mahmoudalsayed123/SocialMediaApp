"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import {
  getAllUserInfoByEmail,
  getFollowers,
  getFollows,
  getPostsById,
  getPostsByLike,
  getUserByid,
} from "../../_utils/postApi";
import ProfileYourPost from "./ProfileYourPost";
import Following from "./Following";
import Link from "next/link";

import { IoImageOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { RiUserFollowLine } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

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

function Profile({ params }) {
  const { id } = params;

  const [posts, setPosts] = useState([]);
  const [postUserLiked, setPostUserLiked] = useState([]);

  const [userSessionInfo, setUserSessionInfo] = useState({});
  const [userInfo, setUserInfo] = useState({});
  const [yourPosts, setYourPosts] = useState(true);
  const [postsLiked, setPostsLiked] = useState(false);
  const [follow, setFollow] = useState(false);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const { user } = useUser();

  useEffect(
    function () {
      getUserByid(id).then((res) => {
        setUserInfo(res);
        getPostsById(res.id).then((res) => setPosts(res));
        getPostsByLike(res.id).then((resPosts) => setPostUserLiked(resPosts));
      });

      getAllUserInfoByEmail(user?.primaryEmailAddress.emailAddress).then(
        (res) => setUserSessionInfo(res)
      );
    },
    [user?.primaryEmailAddress.emailAddress]
  );

  useEffect(
    function () {
      getFollows(userInfo?.id).then((res) => setFollowing(res));
      getFollowers(userInfo?.id).then((res) => setFollowers(res));
    },

    [userInfo?.id]
  );

  return (
    <section className="px-[20px] lg:ms-[-250px] lg:col-span-2 lg:px-[100px] lg:py-[50px] relative">
      {/* Information About User */}

      <div className="mt-[20px] flex gap-[10px] lg:gap-[30px] lg:mb-[100px] mb-[30px]">
        <div>
          {userInfo?.avatar ? (
            <Image
              src={userInfo?.avatar}
              width={400}
              height={400}
              alt="userAvatar"
              className="me-[10px] lg:me-0 w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full"
            />
          ) : (
            <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full animate-pulse bg-slate-600"></div>
          )}
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-[20px]">{userInfo?.userName}</h2>

          <div className="flex items-center gap-[15px] lg:gap-[30px]">
            <p className="text-nowrap">
              <span className="text-violet-400 text-lg font-semibold">
                {posts.length}
              </span>{" "}
              <span className="text-md font-bold">Posts</span>
            </p>

            <p className="text-nowrap">
              <span className="text-violet-400 text-lg font-semibold">
                {following.length}
              </span>{" "}
              <span className="text-md font-bold">Following</span>
            </p>

            <p className="text-nowrap">
              <span className="text-violet-400 text-lg font-semibold">
                {followers.length}
              </span>{" "}
              <span className="text-md font-bold">Followers</span>
            </p>
          </div>

          {userSessionInfo.id === userInfo.id ? (
            <div className="flex items-center gap-[15px]">
              <Link href="/addPost" className="block">
                <button className="mt-[20px] px-[10px] py-[5px] lg:px-[20px] lg:py-[15px] rounded-lg w-fit flex items-center bg-violet-600 cursor-pointer lg:absolute lg:top-[50px] lg:right-[100px]">
                  <span>
                    <IoMdAddCircleOutline className="text-xl lg:text-3xl font-bold me-[8px]" />
                  </span>
                  <span className="text-md lg:text-xl font-bold text-nowrap">
                    Add Post
                  </span>
                </button>
              </Link>
              <Link href="/editProfile" className="block">
                <button className="mt-[20px] px-[10px] py-[5px] lg:px-[20px] lg:py-[15px] rounded-lg w-fit flex items-center bg-violet-600 cursor-pointer lg:absolute lg:top-[50px] lg:right-[300px]">
                  <span>
                    <FaRegEdit className="text-xl lg:text-3xl font-bold me-[8px]" />
                  </span>
                  <span className="text-md lg:text-xl font-bold text-nowrap">
                    Edit Profile
                  </span>
                </button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Posts Of User + Liked Posts */}

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
    </section>
  );
}

export default Profile;
