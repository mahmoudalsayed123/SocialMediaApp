"use client";
import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  createConversation,
  getAllMessage,
  getConversation,
} from "../_utils/postApi";
import { redirect, usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const BtnAddChat = ({ otherInfo, userSessionInfo }) => {
  const pathName = usePathname();

  useEffect(() => {
    if (
      pathName === `/profile/${otherInfo.id}` &&
      userSessionInfo.id !== otherInfo.id
    ) {
      createConversation(userSessionInfo.id, otherInfo.id);
    }
  }, [userSessionInfo.id, otherInfo.id, pathName]);

  async function handleChat() {
    const conversationId = await getConversation(
      otherInfo.id,
      userSessionInfo.id,
    );
    if (conversationId.length > 0) {
      redirect(`/chat/${conversationId[0].id}`);
    }

    await createConversation(userSessionInfo.id, otherInfo.id);
  }

  return (
    <button
      onClick={handleChat}
      className="mb-[10px] sm:mb-0 flex items-center gap-[5px]  bg-gray-800 px-[10px] py-[5px] md:px-[10px] md:py-[5px] lg:px-[20px] lg:py-[8px]  rounded-md me-[5px]"
    >
      <Image
        src="/assets/icons/chat.svg"
        alt="chat"
        width={15}
        height={15}
        className="w-[15px] h-[15px] md:w-[20px] md:h-[20px]"
      />
      <p className="text-sm md:text-md lg:text-lg font-semibold line-clamp-1">
        Chat
      </p>
    </button>
  );
};

export default BtnAddChat;
