import Like from "@/app/_components/Like";
import SavedPost from "@/app/_components/SavedPost";
import { getPostById, getUserByid } from "@/app/_utils/postApi";
import Image from "next/image";
import Link from "next/link";

async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPostById(id);
  const userInfo = await getUserByid(post?.userPostId);

  return (
    <div className="flex-col-reverse justify-center items-center lg:ms-[-200px] lg:grid lg:grid-cols-2 lg:col-span-2 lg:py-[100px] ">
      {/* <IoArrowBack /> */}

      <div className=" mb-[30px] px-[20px] lg:mb-0 lg:col-span-1">
        {post?.content ? (
          <Image
            src={post?.content}
            width={500}
            height={500}
            alt="content"
            className="rounded-lg lg:max-h-[600px]"
          />
        ) : (
          <div className="lg:mb-0 lg:col-span-1 rounded-lg bg-slate-600 animate-pulse"></div>
        )}
      </div>

      <div className=" lg:col-span-1 flex-col lg:ms-[-120px] lg:max-w-[400px] lg:min-h-full  relative">
        <div className="flex-col justify-center itmes-center lg:justify-between">
          <div className="ms-[20px] flex gap-[10px] mb-[20px] lg:mb-[40px]">
            <Link href={`/profile/${userInfo?.id}`}>
              {userInfo?.avatar ? (
                <Image
                  src={userInfo?.avatar}
                  width={300}
                  height={300}
                  alt="avatar"
                  className="w-[60px] h-[60px] rounded-full"
                />
              ) : (
                <div className="w-[100px] h-[100px] lg:w-[100px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
              )}
            </Link>

            <h2 className="text-xl font-bold ">{userInfo?.userName}</h2>
          </div>

          <div>
            <p className="italic text-xl font-semibold ms-[50px] mt-[20px] mb-[30px]">
              {post?.text}
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center px-[20px] lg:absolute lg:bottom-[20px] lg:left-0 w-full">
          <Like postUserId={post?.id} />
          <SavedPost postUserId={post?.id} />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
