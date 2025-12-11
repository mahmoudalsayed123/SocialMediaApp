"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getUserByid } from "./_utils/postApi";

const MessageOther = ({ message }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (message.user_sender_id) {
      getUserByid(message.user_sender_id).then((res) => setUser(res));
    }
  }, [message.user_sender_id]);

  return (
    <div className="flex flex-col items-end mb-6">
      <div className="p-4 bg-gray-800 text-white rounded-lg max-w-[280px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] break-words text-md font-semibold">
        {message.content}
      </div>

      <div className="mt-2">
        {user?.avatar ? (
          <Image
            src={user.avatar}
            alt="message user image"
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

export default MessageOther;
