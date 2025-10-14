import React from "react";
import Image from "next/image";
import img1 from "../../../public/images/1.jpg";

const ChatList = () => {
  return (
    <aside className="lg:col-span-1 px-[20px] py-[50px] lg:px-[40px] lg:py-[70px]">
      <div className="mb-[30px]">
        <input
          name="SearchChat"
          type="text"
          placeholder="Search For Chat..."
          className="w-full p-4 lg:p-5 px-6 lg:px-8 text-xl rounded-4xl lg:rounded-6xl outline-0 mb-[20px] bg-slate-900 "
        />
      </div>

      <div className="flex flex-col gap-[30px]">
        <div className="flex items-start px-[20px] py-[30px] rounded-lg cursor-pointer bg-slate-900">
          <div>
            <Image
              src={img1}
              width={70}
              height={70}
              alt="avatar"
              className="rounded-full me-[20px]"
            />
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-[5px]">Mahmoud Alsayed</h4>
            <p className="text-lg font-semibold">Last Message</p>
          </div>
        </div>



        
      </div>
    </aside>
  );
};

export default ChatList;
