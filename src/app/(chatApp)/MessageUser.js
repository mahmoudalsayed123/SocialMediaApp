"use client";
import Image from "next/image";

const MessageUser = ({ userInfo, message }) => {

  return (
    <div className="px-[30px] py-[20px] bg-blue-500 w-fit max-w-[600px] h-fit rounded-lg  ms-[50px] text-xl font-semibold relative">
      {message.content}
      <span className="absolute bottom-[5px] right-[-60px]">
        {userInfo?.avatar ? (
          <Image
            src={userInfo?.avatar}
            alt="message user image"
            width={100}
            height={100}
            className="rounded-full w-[40px] h-[40px]"
          />
        ) : (
          <div className="w-[40px] h-[40px] lg:w-[40px] lg:h-[40px] rounded-full animate-pulse bg-slate-600"></div>
        )}
      </span>
    </div>
  );
};

export default MessageUser;
