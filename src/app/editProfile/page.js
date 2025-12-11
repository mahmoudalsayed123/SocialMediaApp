"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { getAllUserInfoByEmail, updateUserIfo } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MainHeading from "@/app/_components/MainHeading";
import Back from "@/app/_components/Back";
import { redirect, useRouter } from "next/navigation";

function EditProfile() {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState({});

  const [name, setName] = useState("");

  const inputRef = useRef(null);
  const nameInput = useRef(null);
  const router = useRouter();

  useEffect(
    function () {
      getAllUserInfoByEmail(user?.primaryEmailAddress.emailAddress).then(
        (res) => {
          setUserInfo(res);
        },
      );
    },
    [user?.primaryEmailAddress.emailAddress],
  );

  function handleCancelFields() {
    router.push(`/profile/${userInfo?.id}`);
  }

  function handleSubmite(e) {
    e.preventDefault();
    const newUserInfo = {
      avatar: inputRef.current.files[0],
      userName: name || userInfo?.userName,
    };

    updateUserIfo(userInfo?.id, newUserInfo);

    getAllUserInfoByEmail(user?.primaryEmailAddress.emailAddress).then((res) =>
      setUserInfo(res),
    );
    router.push("/posts");
    // redirect("/posts");
  }

  return (
    <>
      <Back />
      <section className="px-[20px] pb-[30px] mt-[50px] ">
        <MainHeading
          name="Edit Profile"
          url="/assets/icons/edit.svg"
          width={30}
          height={30}
        />

        <form>
          <div className="flex items-center gap-[10px] mb-[30px]">
            {userInfo?.avatar ? (
              <Image
                src={userInfo?.avatar}
                width={500}
                height={500}
                alt="avatar"
                className="w-[60px] h-[60px] rounded-full"
              />
            ) : (
              <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full animate-pulse bg-slate-600"></div>
            )}
            <label className="cursor-pointer">
              <Input
                className="hidden"
                defaultValue={userInfo?.avatar || ""}
                type="file"
                name="content"
                ref={inputRef}
              />
              <p className="text-lg text-blue-500 font-bold">
                Change Profile Image
              </p>
            </label>
          </div>

          <div className="mb-[30px]">
            <p className="text-md font-semibold mb-[10px]">Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              defaultValue={userInfo?.userName || ""}
              name="name"
              type="text"
              ref={nameInput}
              className="w-full p-[10px] outline-0 rounded-md bg-gray-800 border border-gray-800 transition-all duration-300 focus:border-gray-600 placeholder:text-md "
            />
          </div>

          <div className="mb-[30px]">
            <p className="text-md font-semibold mb-[10px]">User Name</p>
            <input
              disabled
              defaultValue={userInfo?.userName || ""}
              type="text"
              className="w-full p-[10px] outline-0 rounded-md bg-gray-800 border border-gray-800 text-gray-600 transition-all duration-300 focus:border-gray-600 placeholder:text-md "
            />
          </div>

          <div className="mb-[30px]">
            <p className="text-md font-semibold mb-[10px]">Email</p>
            <input
              disabled
              defaultValue={userInfo?.email || ""}
              type="text"
              className="w-full p-[10px] outline-0 rounded-md bg-gray-800 border border-gray-800 text-gray-600 transition-all duration-300 focus:border-gray-600 placeholder:text-md "
            />
          </div>
        </form>
        <div className="w-[100%] flex justify-end items-center">
          <Button
            onClick={handleCancelFields}
            className=" px-[15px] py-[5px] rounded-lg bg-slate-600 text-md me-[15px] hover:bg-slate-500 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmite}
            className="px-[15px] py-[5px] rounded-lg bg-violet-600 text-md hover:bg-violet-500 cursor-pointer"
          >
            Submit
          </Button>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
