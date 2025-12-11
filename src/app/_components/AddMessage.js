"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import {
  createMessage,
  getAllMessage,
  subscribeToMessages,
} from "../_utils/postApi";
import MessageUser from "../MessageUser";
import MessageOther from "../MessageOther";
import Image from "next/image";

const AddMessage = ({ userId, conversationId, allMessage, userInfo }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState(allMessage);

  useEffect(() => {
    getAllMessage(conversationId).then((res) => {
      setAllMessages(res);
    });

    const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      setAllMessages((prev) => [...prev, newMessage]);
    });

    return () => unsubscribe();
  }, [conversationId]);

  const handleSendMessage = async (e) => {
    if (message) {
      const newMessage = {
        user_sender_id: userId,
        content: message,
        conversation_id: conversationId,
      };
      await createMessage(newMessage);
      setMessage("");
    }
  };

  function handleKeySend(e) {
    if (e.key === "Enter" && !e.shiftKey && e.target.value !== "") {
      e.preventDefault();
      handleSendMessage();
      e.target.value = "";
    }
  }

  return (
    <>
      <div className="mt-[100px] pb-[100px] md:pb-0">
        {allMessages.map((messageItem) => (
          <React.Fragment key={messageItem.id}>
            {userInfo[0].id === messageItem?.user_sender_id ? (
              <div className=" w-[100%] min-h-[80px] mb-[20px] mt-[60px]">
                {messageItem ? (
                  <MessageUser userInfo={userInfo[0]} message={messageItem} />
                ) : (
                  <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[60px] sm:h-[80px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            ) : (
              <div className=" w-[100%] min-h-[60px]  relative">
                {messageItem ? (
                  <MessageOther message={messageItem} />
                ) : (
                  <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[60px] sm:h-[80px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="w-[95%] lg:w-[97%] flex items-center gap-[15px] absolute bottom-[90px] md:bottom-[20px] left-[10px] ">
        <input
          onChange={(e) => setMessage(e.target.value)}
          name="message"
          type="text"
          onKeyDown={handleKeySend}
          placeholder="Type Your Message..."
          className="w-full px-[20px] py-[10px] outline-0 rounded-3xl bg-gray-800 border border-gray-800 transition-all duration-300 focus:border-gray-600 placeholder:text-md "
          value={message}
        />
        <button onClick={handleSendMessage} className="flex-shrink-0">
          <IoSend className="text-2xl  cursor-pointer hover:text-violet-500 transition-colors" />
        </button>
      </div>
    </>
  );
};

export default AddMessage;
