"use client";
import React, { useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { createMessage, getAllMessage } from "../_utils/postApi";
import MessageUser from "../(chatApp)/MessageUser";
import MessageOther from "../(chatApp)/MessageOther";

const AddMessage = ({ userId, conversationId, allMessage, userInfo }) => {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState(allMessage);
  const inputRef = useRef(null);
 const handleSendMessage = async () => {
    const newMessage = {
      user_sender_id: userId,
      content: message,
      conversation_id: conversationId,
    };
    await createMessage(newMessage).then((res) => {
      setMessage(res.content);
    });
    await getAllMessage(conversationId).then((res) => {
      setAllMessages(res);
    });
    inputRef.current.value = "";
  };

  return (
    <>
      <div className="mt-[350px] mb-[200px]">
        {allMessages.map((message) => (
          <>
            {userInfo[0].id === message?.user_sender_id ? (
              <div className="w-[100%] min-h-[100px]  mb-[30px] mt-[100px]">
                {message ? (
                  <MessageUser
                    key={message.id}
                    userInfo={userInfo[0]}
                    message={message}
                  />
                ) : (
                  <div className="w-[300px] h-[100px] rounded-full animate-pulse bg-slate-600"></div>
                )}
              </div>
            ) : (
              <div className="w-[100%] min-h-[100px]  relative">
                {message ? (
                  <MessageOther
                    key={message.id}
                    userInfo={userInfo[0]}
                    message={message}
                  />
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
            placeholder="Type Your Message..."
            className="w-full p-4 lg:p-5 px-6 lg:px-8 me-[10px] text-xl rounded-4xl lg:rounded-6xl outline-0 bg-gray-800"
            ref={inputRef}
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
