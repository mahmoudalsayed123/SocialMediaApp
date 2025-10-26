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
    <div className="absolute px-[30px] py-[20px] bg-green-500 max-w-[400px] min-h-[80px] rounded-lg me-[50px] text-xl font-semibold top-0 right-[20px]">
      {message.content}
      <span className="absolute bottom-[5px] left-[-60px]">
        {user?.avatar ? (
          <Image
            src={user?.avatar}
            alt="message user image"
            width={100}
            height={100}
            className="rounded-full w-[40px] h-[40px]"
          />
        ) : (
          <div className="w-[40px] h-[40px] lg:w-[40px] lg:h-[40px] rounded-full animate-pulse bg-slate-600 me-[10px]"></div>
        )}
      </span>
    </div>
  );
};

export default MessageOther;
