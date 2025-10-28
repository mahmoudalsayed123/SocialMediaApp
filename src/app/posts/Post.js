import Image from "next/image";

import { getUserByid } from "../_utils/postApi";
import Like from "../_components/Like";
import SavedPost from "../_components/SavedPost";
import Link from "next/link";
import SkeletonPost from "./SkeletonPost";

async function Post({ post }) {
  const userPost = await getUserByid(post?.userPostId);

  return (
    <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-700/50 rounded-xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 lg:mb-6 transition-all hover:bg-dark-900 hover:border-primary-500/30 hover:shadow-glow">
      {post ? (
        <>
          <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="flex-shrink-0">
              <Link
                href={`/profile/${userPost?.id}`}
                className="block hover:opacity-80 transition-opacity"
              >
                {userPost?.avatar ? (
                  <Image
                    src={userPost?.avatar}
                    alt="avatar"
                    width={50}
                    height={50}
                    className="rounded-full w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] lg:w-[55px] lg:h-[55px] border-2 border-primary-500/50"
                  />
                ) : (
                  <div className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] lg:w-[55px] lg:h-[55px] rounded-full animate-pulse bg-dark-700"></div>
                )}
              </Link>
            </div>

            <div className="flex-1 min-w-0">
              <Link
                href={`/profile/${userPost?.id}`}
                className="block hover:text-primary-400 transition-colors"
              >
                <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-1 truncate">
                  {userPost?.userName}
                </h2>
                <p className="text-xs sm:text-sm text-dark-400">
                  {userPost?.created}
                </p>
              </Link>
            </div>
          </div>

          <div>
            {post.text && (
              <p className="mb-4 sm:mb-5 text-sm sm:text-base lg:text-lg tracking-wide leading-relaxed text-white/90">
                {post.text}
              </p>
            )}
            <div className="rounded-xl overflow-hidden">
              {post?.content ? (
                <Image
                  src={post.content}
                  width={500}
                  height={500}
                  alt="content"
                  className="w-full h-auto max-h-[350px] sm:max-h-[450px] lg:max-h-[600px] object-cover transition-transform hover:scale-[1.01]"
                />
              ) : (
                <div className="w-full h-[250px] sm:h-[300px] lg:h-[400px] animate-pulse bg-dark-700"></div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 sm:mt-5 lg:mt-6 pt-3 sm:pt-4 border-t border-dark-700/50">
            <Like postUserId={post?.id} />

            <SavedPost postUserId={post?.id} />
          </div>
        </>
      ) : (
        <SkeletonPost />
      )}
    </div>
  );
}

export default Post;
