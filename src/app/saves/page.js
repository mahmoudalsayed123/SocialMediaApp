import PostSaveContainer from "./PostSaveContainer";
import { getAllSaves, getUserByEmail } from "../_utils/postApi";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import MainHeading from "@/app/_components/MainHeading";
import Back from "@/app/_components/Back";

async function PostsSavePage() {
  const user = await currentUser();
  const userId = await getUserByEmail(user?.primaryEmailAddress?.emailAddress);
  const postsSaved = await getAllSaves(userId?.[0]?.id);

  return (
    <>
      <Back />
      <div className="px-[20px] sm:px-[20px] md:mt-[50px] lg:col-span-2 relative">
        <MainHeading
          name="Saved Posts"
          url="/assets/icons/save.svg"
          width={50}
          height={50}
        />

        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-[15px]">
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
    </>
  );
}

export default PostsSavePage;
