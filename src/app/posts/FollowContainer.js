import Image from "next/image";

import Link from "next/link";
import SkeletonFollow from "./SkeletonFollow";
import IsFollow from "../_components/IsFollow";
import {
  deleteConversation,
  getAllMessage,
  getAllUserInfoByEmail,
  getConversation,
} from "../_utils/postApi";
import { currentUser } from "@clerk/nextjs/server";

async function FollowContainer({ creator }) {
  const user = await currentUser();

  const userSession = await getAllUserInfoByEmail(
    user?.primaryEmailAddress?.emailAddress,
  );

  const conversation = await getConversation(creator.id, userSession.id);

  if (conversation.length > 0) {
    let messages = await getAllMessage(conversation[0]?.id);
    if (messages.length === 0) {
      deleteConversation(conversation[0]?.id);
    }
  }

  return (
    <div className=" text-center col-span-1 flex-col justify-center items-center italic ">
      {creator?.avatar ? (
        <>
          <div className="flex-col ">
            <Link href={`/profile/${creator.id}`}>
              {creator?.avatar ? (
                <Image
                  src={creator?.avatar || null}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="w-[50px] h-[50px] mb-[10px] mx-auto rounded-full"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full mb-3 bg-slate-600 animate-pulse"></div>
              )}
            </Link>
          </div>
          <h3 className="text-md font-bold mb-[15px] ms-[4px] line-clamp-1">
            {creator.userName}
          </h3>

          <IsFollow
            creator={creator}
            className="bg-violet-400 rounded-md ms-[4px] px-[10px] py-[3px] text-md font-bold cursor-pointer transition-all duration-300 hover:bg-violet-500"
          />
        </>
      ) : (
        <SkeletonFollow />
      )}
    </div>
  );
}

export default FollowContainer;
