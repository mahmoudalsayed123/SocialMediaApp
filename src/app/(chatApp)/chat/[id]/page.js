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
    <div className=" bg-slate-900 lg:ms-[-333px] min-h-[100vh]  pt-[80px] pb-[20px] relative">
      <div className="w-[100%]">
        <div className="absolute top-[1%] sm:top-[1.5%] left-[50%] translate-x-[-50%] flex flex-col items-center z-10 w-full px-4">
          <div>
            {userInfo[0]?.avatar ? (
              <Image
                src={userInfo[0]?.avatar}
                width={400}
                height={400}
                alt="userAvatar"
                className=" me-[10px] lg:me-0 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full"
              />
            ) : (
              <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold italic mt-[10px] sm:mt-[20px] text-center">
            {userInfo[0]?.userName}
          </h3>
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
