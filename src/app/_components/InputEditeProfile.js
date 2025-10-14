"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const InputEditeProfile = ({ className, defaultValue, type, name }) => {
  const inputRef = useRef(null);
  const nameInput = useRef(null);

  function handleClearFields() {
    nameInput.current.value = "";
  }

  function handleSubmite(e) {
    e.preventDefault();
    const newUserInfo = {
      avatar: inputRef.current.files[0],
      userName: name || userInfo?.userName,
    };

    updateUserIfo(userInfo?.id, newUserInfo).then((res) => console.log(res));
    handleClearFields();
    redirect("/posts");
  }
  return (
    <form>
      <div className="flex gap-[20px] mb-[30px]">
        {userInfo?.avatar ? (
          <Image
            src={userInfo?.avatar}
            width={500}
            height={500}
            alt="avatar"
            className="w-[100px] h-[100px] rounded-full"
          />
        ) : (
          <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full animate-pulse bg-slate-600"></div>
        )}
        <label className="cursor-pointer ">
          <Input
            className="hidden"
            defaultValue={userInfo?.avatar}
            type="file"
            name="content"
          />
          <p className="text-xl text-blue-500 font-bold mt-[20px]">
            Change Profile Image
          </p>
        </label>
      </div>

      <div className="mb-[30px]">
        <h2 className="text-lg font-bold mb-[20px]">Name</h2>
        <Input
          onChange={(e) => setName(e.target.value)}
          className="border-1 border-slate-700 px-[25px] py-[15px] w-full outline-0 rounded-lg"
          defaultValue={userInfo?.userName}
          type="text"
          name="name"
        />
      </div>

      <div className="mb-[30px]">
        <h2 className=" text-lg font-bold mb-[20px]">User Name</h2>
        <input
          disabled
          value={userInfo?.userName}
          type="text"
          className="border-1 border-slate-700 px-[25px] py-[15px] w-full outline-0 rounded-lg text-gray-500 text-lg"
        />
      </div>

      <div className="mb-[30px]">
        <h2 className="text-lg font-bold mb-[20px]">Email</h2>
        <input
          disabled
          value={userInfo?.email}
          type="text"
          className="border-1 border-slate-700 px-[25px] py-[15px] w-full outline-0 rounded-lg text-gray-500 text-lg"
        />
      </div>
      <div className="w-[100%] flex justify-end items-center">
        <Button
          onClick={handleClearFields}
          className="w-fit px-[30px] py-[25px] rounded-lg bg-slate-600 text-lg me-[20px] hover:bg-slate-500 cursor-pointer"
        >
          Clear
        </Button>
        <Button
          onClick={handleSubmite}
          className="w-fit px-[30px] py-[25px] rounded-lg bg-violet-600 text-lg hover:bg-violet-500 cursor-pointer"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

export default InputEditeProfile;
