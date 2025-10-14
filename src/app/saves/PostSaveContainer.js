import Image from "next/image";

import {
  deleteConversation,
  getAllMessage,
  getAllUserInfoByEmail,
  getAllUserWithoutMe,
  getConversation,
  getUserByid,
} from "../_utils/postApi";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

async function PostSaveContainer({ post }) {
  const user = await currentUser();
  const postUserInfo = await getUserByid(post?.userPostId);
  const otherId = await getAllUserWithoutMe(postUserInfo?.id);
  const userSession = await getAllUserInfoByEmail(
    user?.primaryEmailAddress?.emailAddress
  );

  const conversation = await getConversation(otherId.id, userSession.id);
  const allMessages = await getAllMessage(conversation[0]?.id);

  if (conversation.length > 0 && allMessages.length === 0) {
    deleteConversation(conversation[0]?.id);
  }

  return (
    <>
      {post ? (
        <div className="mb-[50px] relative lg:col-span-1 cursor-pointer">
          <Link className="block" href={`/posts/${post.id}`}>
            {post?.content ? (
              <Image
                src={post?.content}
                width={500}
                height={500}
                alt="post content"
                className="w-full h-fit lg:w-[300px] lg:h-[300px] rounded-xl"
              />
            ) : (
              <div className=" rounded-lg ms-[10px] w-[500px] h-[400px] animate-pulse bg-slate-600"></div>
            )}
          </Link>
          <div className="absolute bottom-[20px] left-[15px] cursor-pointer flex items-center gap-[10px]">
            <Link href={`/profile/${post.userPostId}`}>
              {postUserInfo?.avatar ? (
                <Image
                  src={postUserInfo?.avatar}
                  width={500}
                  height={500}
                  alt="user avatar"
                  className="w-[40px] h-[40px] rounded-full"
                />
              ) : (
                <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full animate-pulse bg-slate-600"></div>
              )}
            </Link>
          </div>
        </div>
      ) : (
        <p>No Posts Saved </p>
      )}
    </>
  );
}

export default PostSaveContainer;
