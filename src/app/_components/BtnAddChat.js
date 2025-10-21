"use client";
import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import {
  createConversation,
  getAllMessage,
  getConversation,
} from "../_utils/postApi";
import { redirect, usePathname, useRouter } from "next/navigation";

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
      userSessionInfo.id
    );
    if (conversationId.length > 0) {
      redirect(`/chat/${conversationId[0].id}`);
    }

    await createConversation(userSessionInfo.id, otherInfo.id);
  }

  return (
    <button
      onClick={handleChat}
      className="mt-[20px] px-[10px] py-[5px] lg:px-[20px] lg:py-[15px] rounded-lg w-fit flex items-center bg-violet-600 cursor-pointer lg:absolute lg:top-[50px] lg:right-[100px]"
    >
      <span>
        <IoChatbubbleEllipsesOutline className="text-xl lg:text-3xl font-bold me-[8px]" />
      </span>
      <span className="text-md lg:text-xl font-bold text-nowrap">
        Chat {otherInfo.userName}
      </span>
    </button>
  );
};

export default BtnAddChat;
