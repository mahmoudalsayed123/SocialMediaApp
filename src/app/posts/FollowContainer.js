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
    user?.primaryEmailAddress?.emailAddress
  );

  const conversation = await getConversation(creator.id, userSession.id);

  if (conversation.length > 0) {
    let messages = await getAllMessage(conversation[0]?.id);
    if (messages.length === 0) {
      deleteConversation(conversation[0]?.id);
    }
  }

  return (
    <div className="col-span-1 flex-col justify-center items-center italic ">
      {creator?.avatar ? (
        <>
          <div className="flex-col justify-center items-center gap-[10px]">
            <Link href={`/profile/${creator.id}`}>
              {creator?.avatar ? (
                <Image
                  src={creator?.avatar || null}
                  alt="avatar"
                  width={200}
                  height={200}
                  className="w-[50px] h-[50px] rounded-full mb-3 ms-[10px]"
                />
              ) : (
                <div className="w-[50px] h-[50px] rounded-full mb-3 bg-slate-600 animate-pulse"></div>
              )}
            </Link>

            <h3 className="text-xl font-bold mb-[15px]">{creator.userName}</h3>
          </div>

          <IsFollow creator={creator} />
        </>
      ) : (
        <SkeletonFollow />
      )}
    </div>
  );
}

export default FollowContainer;
