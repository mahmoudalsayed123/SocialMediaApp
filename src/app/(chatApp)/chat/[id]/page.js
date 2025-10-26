import Image from "next/image";

import { getAllMessage, getUserByEmail } from "@/app/_utils/postApi";

import AddMessage from "../../../_components/AddMessage";
import { currentUser } from "@clerk/nextjs/server";

const ChatPage = async ({ params }) => {
  const { id } = await params;
  const user = await currentUser();
  const allMessage = await getAllMessage(id);
  const userId = await getUserByEmail(user?.primaryEmailAddress?.emailAddress);
  const userInfo = await getUserByEmail(
    user?.primaryEmailAddress?.emailAddress
  );
  return (
    <div className="col-span-2 bg-slate-900 lg:ms-[-250px] relative">
      <div className="w-[100%]">
        <div className="absolute top-[1.5%] left-[50%] translate-x-[-50%] flex flex-col items-center">
          <div>
            {userInfo[0]?.avatar ? (
              <Image
                src={userInfo[0]?.avatar}
                width={400}
                height={400}
                alt="userAvatar"
                className="me-[10px] lg:me-0 w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full"
              />
            ) : (
              <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full animate-pulse bg-slate-600"></div>
            )}
          </div>

          <h3 className="text-3xl font-bold italic mt-[20px]">{userInfo[0]?.userName}</h3>
        </div>
      </div>

      <AddMessage
        userId={userId[0]?.id}
        conversationId={id}
        allMessage={allMessage}
        userInfo={userInfo}
      />
    </div>
  );
};

export default ChatPage;
