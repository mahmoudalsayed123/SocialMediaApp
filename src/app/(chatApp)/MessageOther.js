"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserByid } from "../_utils/postApi";

const MessageOther = ({ message }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    if (message.user_sender_id) {
      getUserByid(message.user_sender_id).then((res) => setUser(res));
    }
  }, [message.user_sender_id, user]);
  return (
    <div className="absolute px-[15px] sm:px-[20px] lg:px-[30px] py-[12px] sm:py-[16px] lg:py-[20px] bg-violet-700/50 max-w-[280px] sm:max-w-[350px] md:max-w-[400px] min-h-[60px] sm:min-h-[70px] lg:min-h-[80px] rounded-lg me-[30px] sm:me-[40px] lg:me-[50px] text-sm sm:text-base lg:text-xl font-semibold top-0 right-[10px] sm:right-[15px] lg:right-[20px] break-words">
      {message.content}
      <span className="absolute bottom-[5px] left-[-45px] sm:left-[-50px] lg:left-[-60px]">
        {user?.avatar ? (
          <Image
            src={user?.avatar}
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

export default MessageOther;
