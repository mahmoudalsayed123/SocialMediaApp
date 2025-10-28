"use client";
import Image from "next/image";

const MessageUser = ({ userInfo, message }) => {
  return (
    <div className="px-[15px] sm:px-[20px] lg:px-[30px] py-[12px] sm:py-[16px] lg:py-[20px] bg-violet-700 w-fit max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] h-fit rounded-lg ms-[30px] sm:ms-[40px] lg:ms-[50px] text-sm sm:text-base lg:text-xl font-semibold relative break-words">
      {message.content}
      <span className="absolute bottom-[5px] right-[-45px] sm:right-[-50px] lg:right-[-60px]">
        {userInfo?.avatar ? (
          <Image
            src={userInfo?.avatar}
            alt="message user image"
            width={100}
            height={100}
            className="rounded-full w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px]"
          />
        ) : (
          <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] lg:w-[40px] lg:h-[40px] rounded-full animate-pulse bg-slate-600"></div>
        )}
      </span>
    </div>
  );
};

export default MessageUser;
