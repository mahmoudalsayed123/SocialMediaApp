"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import {
  createMessage,
  getAllMessage,
  subscribeToMessages,
} from "../_utils/postApi";
import MessageUser from "../(chatApp)/MessageUser";
import MessageOther from "../(chatApp)/MessageOther";

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
    const newMessage = {
      user_sender_id: userId,
      content: message,
      conversation_id: conversationId,
    };
    await createMessage(newMessage);
    setMessage("");
  };

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
      e.target.value = "";
    }
  }

  return (
    <>
      <div className="mt-[350px] mb-[200px]">
        {allMessages.map((messageItem) => (
          <>
            {userInfo[0].id === messageItem?.user_sender_id ? (
              <div
                key={messageItem.id}
                className="w-[100%] min-h-[100px]  mb-[30px] mt-[100px]"
              >
                {messageItem ? (
                  <MessageUser
                    key={messageItem.id}
                    userInfo={userInfo[0]}
                    message={messageItem}
                  />
                ) : (
                  <div className="w-[300px] h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            ) : (
              <div className="w-[100%] min-h-[100px]  relative">
                {messageItem ? (
                  <MessageOther key={messageItem.id} message={messageItem} />
                ) : (
                  <div className="w-[300px] h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            )}
          </>
        ))}
      </div>
      <div className="absolute bottom-[10px] left-0 px-[20px] mb-[20px]  w-[100%] ">
        <div className="w-[100%] flex items-center">
          <input
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Type Your Message..."
            className="w-full p-4 lg:p-5 px-6 lg:px-8 me-[10px] text-xl rounded-4xl lg:rounded-6xl outline-0 bg-gray-800"
            // ref={inputRef}
          />
          <button onClick={handleSendMessage}>
            <IoSend className=" text-4xl cursor-pointer" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMessage;
