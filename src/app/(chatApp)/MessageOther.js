"use client";
import Image from "next/image";

const MessageOther = ({ userInfo, message }) => {
  return (
    <div className="absolute px-[30px] py-[20px] bg-green-500 max-w-[400px] min-h-[80px] rounded-lg me-[50px] text-xl font-semibold top-0 right-[20px]">
      {message.content}
      <span className="absolute bottom-[10px] left-[-60px]">
        {userInfo?.avatar ? (
          <Image
            src={userInfo?.avatar}
            alt="message user image"
            width={100}
            height={100}
            className="rounded-full w-[40px] h-[40px]"
          />
        ) : (
          <div className="w-[60px] h-[60px] lg:w-[80px] lg:h-[80px] rounded-full animate-pulse bg-slate-600"></div>
        )}
      </span>
    </div>
  );
};

export default MessageOther;
