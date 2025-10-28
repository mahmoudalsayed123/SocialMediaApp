import { IoBookmarkOutline } from "react-icons/io5";
import PostSaveContainer from "./PostSaveContainer";
import { getAllSaves, getUserByEmail } from "../_utils/postApi";
import { currentUser } from "@clerk/nextjs/server";

async function PostsSavePage() {
  const user = await currentUser();
  const userId = await getUserByEmail(user?.primaryEmailAddress?.emailAddress);
  const postsSaved = await getAllSaves(userId?.[0]?.id);

  return (
    <div className="px-[15px] sm:px-[20px] lg:ms-[-200px] lg:col-span-2 relative">
      <div className="flex items-center my-[30px] sm:my-[40px] lg:my-[50px]">
        <IoBookmarkOutline className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-white mb-[5px] sm:mb-[10px] pt-[5px] sm:pt-[10px]" />
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl pe-[10px] sm:pe-[15px] lg:pe-[20px] py-[5px] sm:py-[10px] lg:py-[40px]">
          Saved Posts
        </h1>
      </div>
      <div className="flex-col justify-center items-center grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-[30px]">
        {postsSaved.map((post) => (
          <PostSaveContainer key={post.posts.id} post={post.posts} />
        ))}
        {postsSaved.length === 0 && (
          <p className="absolute top-[50%] left-[50%] translate-X-[-50%] translate-Y-[-50%] text-lg sm:text-xl lg:text-2xl font-bold">
            No Posts Saved !!!
          </p>
        )}
      </div>
    </div>
  );
}

export default PostsSavePage;
