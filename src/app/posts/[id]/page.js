import Like from "../../_components/Like";
import SavedPost from "../../_components/SavedPost";
import { getPostById, getUserByid } from "../../_utils/postApi";
import Image from "next/image";
import Link from "next/link";
import { formatDateTime } from "../../../lib/utils";
import Back from "@/app/_components/Back";

async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);
  const userInfo = await getUserByid(post?.userPostId);

  return (
    <>
      <Back />
      <div className=" mt-[50px] md:mt-[100px] px-[20px] md:flex md:justify-center md:items-start md:gap-[10px] ">
        {/* <IoArrowBack /> */}

        <div className=" mb-[50px] overflow-hidden sm:w-[500px] lg:w-[400px] lg:h-[370px] sm:m-auto sm:mb-[50px] md:m-0 border border-[#1F1F22] px-[20px] py-[20px] rounded-lg ">
          {post?.content ? (
            <Image
              src={post?.content}
              width={300}
              height={300}
              alt="content"
              className="w-full h-auto max-h-[500px] sm:w-[500px] sm:h-[400px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[330px] sm:m-auto md:m-0 object-fill transition-transform hover:scale-[1.01] rounded-lg"
            />
          ) : (
            <div className="lg:mb-0 lg:col-span-1 rounded-lg bg-slate-600 animate-pulse"></div>
          )}
        </div>

        <div className="md:relative sm:w-[500px] md:h-[342px] lg:h-[370px] sm:m-auto md:m-0  border border-[#1F1F22] px-[20px] py-[20px] rounded-lg">
          {/* UserImage, userName, Date */}
          <div className="flex items-center gap-[15px]">
            {/* UserImage */}
            <Link href={`/profile/${userInfo?.id}`} className="block">
              {userInfo?.avatar ? (
                <Image
                  src={userInfo?.avatar}
                  width={300}
                  height={300}
                  alt="avatar"
                  className="w-[60px] h-[60px] rounded-full"
                />
              ) : (
                <Image
                  src="/assets/icons/profile.svg"
                  width={300}
                  height={300}
                  alt="avatar"
                  className="w-[60px] h-[60px] rounded-full"
                />
              )}
            </Link>
            {/* userName, Date*/}
            <div>
              <h2 className="text-xl font-bold ">{userInfo?.userName}</h2>
              <p className="text-sm text-gray-400">
                {formatDateTime(userInfo.created_at)}
              </p>
            </div>
          </div>
          {/* Description */}
          <div className="ms-[30px] mt-[30px] mb-[50px]">
            <p className="italic text-lg font-semibold">{post?.text}</p>
          </div>
          {/* Like, Save */}
          <div className="flex items-center justify-between px-[10px] md:absolute md:bottom-[20px] md:left-0 md:w-full">
            <Like postUserId={post?.id} />
            <SavedPost postUserId={post?.id} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostPage;
