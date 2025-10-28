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
      <div className="mt-[200px] sm:mt-[280px] lg:mt-[350px] mb-[120px] sm:mb-[160px] lg:mb-[200px] px-2 sm:px-4">
        {allMessages.map((messageItem) => (
          <>
            {userInfo[0].id === messageItem?.user_sender_id ? (
              <div
                key={messageItem.id}
                className="w-[100%] min-h-[80px] sm:min-h-[90px] lg:min-h-[100px] mb-[20px] sm:mb-[25px] lg:mb-[30px] mt-[60px] sm:mt-[80px] lg:mt-[100px]"
              >
                {messageItem ? (
                  <MessageUser
                    key={messageItem.id}
                    userInfo={userInfo[0]}
                    message={messageItem}
                  />
                ) : (
                  <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[60px] sm:h-[80px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            ) : (
              <div className="w-[100%] min-h-[60px] sm:min-h-[80px] lg:min-h-[100px] relative">
                {messageItem ? (
                  <MessageOther key={messageItem.id} message={messageItem} />
                ) : (
                  <div className="w-[200px] sm:w-[250px] lg:w-[300px] h-[60px] sm:h-[80px] lg:h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            )}
          </>
        ))}
      </div>
      <div className="absolute bottom-[10px] left-0 px-[10px] sm:px-[15px] lg:px-[20px] mb-[10px] sm:mb-[15px] lg:mb-[20px] w-[100%]">
        <div className="w-[100%] flex items-center gap-2 sm:gap-[10px]">
          <input
            onChange={(e) => setMessage(e.target.value)}
            name="message"
            type="text"
            onKeyDown={handleKeyDown}
            placeholder="Type Your Message..."
            className="w-full p-3 sm:p-4 lg:p-5 px-4 sm:px-6 lg:px-8 text-base sm:text-lg lg:text-xl rounded-3xl sm:rounded-4xl lg:rounded-6xl outline-0 bg-gray-800"
          />
          <button onClick={handleSendMessage} className="flex-shrink-0">
            <IoSend className="text-3xl sm:text-3xl lg:text-4xl cursor-pointer hover:text-blue-400 transition-colors" />
          </button>
        </div>
      </div>
    </>
  );
};

export default AddMessage;
