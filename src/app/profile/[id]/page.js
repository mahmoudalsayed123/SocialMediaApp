import Image from "next/image";

import {
  getAllUserInfoByEmail,
  getFollowers,
  getFollows,
  getPostsById,
  getPostsByLike,
  getUserByid,
} from "../../_utils/postApi";

import Link from "next/link";
import ProfilePosts from "../../_components/ProfilePosts";
import BtnAddChat from "../../_components/BtnAddChat";

import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

import { currentUser } from "@clerk/nextjs/server";

async function Profile({ params }) {
  const { id } = await params;

  const user = await currentUser();
  const userInfo = await getUserByid(id);
  const posts = await getPostsById(userInfo.id);
  const postUserLiked = await getPostsByLike(userInfo.id);
  const userSessionInfo = await getAllUserInfoByEmail(
    user?.primaryEmailAddress.emailAddress
  );
  const following = await getFollows(userInfo?.id);
  const followers = await getFollowers(userInfo?.id);

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
          {userSessionInfo.id !== userInfo.id && (
            <BtnAddChat
              otherInfo={userInfo}
              userSessionInfo={userSessionInfo}
            />
          )}

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

      <ProfilePosts
        posts={posts}
        postUserLiked={postUserLiked}
        following={following}
      />
    </section>
  );
}

export default Profile;
