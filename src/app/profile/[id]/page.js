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

import { currentUser } from "@clerk/nextjs/server";
import Back from "@/app/_components/Back";
import IsFollow from "@/app/_components/IsFollow";

async function Profile({ params }) {
  const { id } = await params;

  const user = await currentUser();
  const userInfo = await getUserByid(id);
  const posts = await getPostsById(userInfo.id);
  const postUserLiked = await getPostsByLike(userInfo.id);
  const userSessionInfo = await getAllUserInfoByEmail(
    user?.primaryEmailAddress.emailAddress,
  );
  const following = await getFollows(userInfo?.id);
  const followers = await getFollowers(userInfo?.id);

  return (
    <>
      <Back />
      <section className="px-[15px] py-[30px] md:p-[30px]">
        {/* Information About User */}

        <div className="flex justify-between items-center mb-[30px]">
          {/* Image Container + UserName + Number Of { post, followering, follower } */}
          <div className="flex items-center gap-[10px]">
            {/* Image Container */}
            <div>
              <Image
                src={userInfo?.avatar}
                width={60}
                height={60}
                alt="userAvatar"
                className="w-[60px] h-[60px] rounded-full"
              />
            </div>
            {/*UserName + Number Of { post, followering, follower }  */}
            <div className="flex-col items-center">
              {/*  UserName */}
              <h2 className="w-fit font-bold text-lg mb-[10px] line-clamp-1">
                {userInfo?.userName}
              </h2>
              {/*  Number Of { post, followering, follower } */}
              <div className="flex items-center gap-[10px]">
                <p className="font-bold text-violet-500 flex items-center gap-[5px]">
                  {posts.length}{" "}
                  <span className="text-white text-md font-medium block ">
                    Posts
                  </span>
                </p>
                <p className="hidden sm:flex font-bold text-violet-500 items-center gap-[5px]">
                  {following.length}
                  <span className="text-white text-md font-medium block">
                    Following
                  </span>
                </p>
                <p className="font-bold text-violet-500 flex items-center gap-[5px]">
                  {followers.length}
                  <span className="text-white text-md font-medium block">
                    Followers
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Container Of Add Post And Update Profile And Chat */}
          <div className=" sm:flex items-center justify-center sm:gap-[5px]">
            {userSessionInfo.id !== userInfo.id && (
              <>
                <BtnAddChat
                  otherInfo={userInfo}
                  userSessionInfo={userSessionInfo}
                />
                <IsFollow
                  creator={userInfo}
                  className="flex items-center gap-[5px]  bg-gray-800 px-[10px] py-[5px] md:px-[10px] md:py-[5px] lg:px-[20px] lg:py-[8px] lg:text-lg rounded-md me-[5px] text-sm md:text-md font-semibold tracking-wider"
                />
              </>
            )}
            {userSessionInfo.id === userInfo.id ? (
              // btn edite profile and add post
              <Link
                href="/editProfile"
                className="flex items-center gap-[8px] bg-gray-800 px-[10px] py-[5px] md:px-[15px] md:py-[5px] rounded-md"
              >
                <Image
                  src="/assets/icons/edit.svg"
                  alt="addPost"
                  width={15}
                  height={15}
                  className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
                />
                <p className="text-sm md:text-lg font-semibold">Edite</p>
              </Link>
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
    </>
  );
}

export default Profile;
