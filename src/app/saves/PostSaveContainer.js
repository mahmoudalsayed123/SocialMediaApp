import { currentUser } from "@clerk/nextjs/server";
import {
  getAllMessage,
  getAllUserInfoByEmail,
  getConversation,
  getUserByid,
} from "@/app/_utils/postApi";
import Link from "next/link";
import Image from "next/image";

async function PostSaveContainer({ post }) {
  const user = await currentUser();

  const userSession = await getAllUserInfoByEmail(
    user?.primaryEmailAddress?.emailAddress,
  );

  const otherId = post?.userPostId;

  if (!otherId || !userSession?.id) {
    return null;
  }

  const conversation = await getConversation(otherId, userSession.id);

  if (conversation.length > 0) {
    let messages = await getAllMessage(conversation[0]?.id);
    if (messages.length === 0) {
      deleteConversation(conversation[0]?.id);
    }
  }

  const postUserInfo = await getUserByid(post?.userPostId);

  return (
    <>
      {post ? (
        <div className=" sm:col-span-1  mb-[30px] relative cursor-pointer ">
          <Link className=" block w-full h-full" href={`/posts/${post.id}`}>
            {post?.content ? (
              <Image
                src={post?.content}
                width={500}
                height={500}
                alt="post content"
                className="w-full max-h-[500px] m-auto sm:m-0 sm:w-[300px] sm:h-[300px] md:w-[250px] md:h-[250px] rounded-xl"
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
