import Image from "next/image";

import { getAllMessage, getUserByEmail } from "../../_utils/postApi";

import AddMessage from "../../_components/AddMessage";
import { currentUser } from "@clerk/nextjs/server";
import Back from "@/app/_components/Back";

const ChatPage = async ({ params }) => {
  const { id } = await params;
  const user = await currentUser();
  const allMessage = await getAllMessage(id);
  const userId = await getUserByEmail(user?.primaryEmailAddress?.emailAddress);
  const userInfo = await getUserByEmail(
    user?.primaryEmailAddress?.emailAddress,
  );
  return (
    <>
      <Back />
      <section className=" px-[20px] pb-[80px] min-h-[100vh] pt-[50px] relative">
        <div>
          {userInfo[0]?.avatar ? (
            <Image
              src={userInfo[0]?.avatar}
              width={100}
              height={100}
              alt="userAvatar"
              className="w-[50px] h-[50px] m-auto rounded-full"
            />
          ) : (
            <div className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] md:w-[80px] md:h-[80px] lg:w-[100px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
          )}

          <h3 className="text-xl font-bold mt-[10px] text-center">
            {userInfo[0]?.userName}
          </h3>
        </div>

        <AddMessage
          userId={userId[0]?.id}
          conversationId={id}
          allMessage={allMessage}
          userInfo={userInfo}
        />
      </section>
    </>
  );
};

export default ChatPage;
