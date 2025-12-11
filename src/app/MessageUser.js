"use client";
import Image from "next/image";

const MessageUser = ({ userInfo, message }) => {
  return (
    <div className="flex flex-col items-start mb-6">
      <div className="p-4 bg-violet-800 text-white rounded-lg max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] break-words text-md font-semibold">
        {message.content}
      </div>

      <div className="mt-2">
        {userInfo?.avatar ? (
          <Image
            src={userInfo.avatar}
            alt="my avatar"
            width={32}
            height={32}
            className="rounded-full w-[32px] h-[32px]"
          />
        ) : (
          <div className="w-[32px] h-[32px] rounded-full animate-pulse bg-slate-600"></div>
        )}
      </div>
    </div>
  );
};

export default MessageUser;
