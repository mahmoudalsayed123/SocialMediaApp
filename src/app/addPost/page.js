"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { addPost, getUserByEmail } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";
import { LuImagePlus } from "react-icons/lu";
import { redirect } from "next/navigation";

function AddPost() {
  const { user } = useUser();
  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  const [userActive, setUserActive] = useState("");

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress.emailAddress)
        .then()
        .then((data) => setUserActive(data));
    },
    [user?.primaryEmailAddress.emailAddress]
  );

  function handleClearFields() {
    textAreaRef.current.value = "";
  }

  function handleSubmite(e) {
    e.preventDefault();
    const newPost = {
      text: textAreaRef.current.value,
      content: inputRef.current.files[0],
      userPostId: userActive.id,
    };

    addPost(newPost);
    handleClearFields();
    redirect("/posts");
  }

  return (
    <section className="py-[50px] pe-[100px] lg:col-span-2 lg:ms-[-100px]">
      <h1 className="font-bold flex items-center gap-[10px] mb-[50px] text-4xl">
        <LuImagePlus />
        <span>Create Post</span>
      </h1>
      <form className="p-5 mt-10 lg:p-0 lg:mt-0 w-full flex-col justify-center items-center gap-[20px] ">
        <div>
          <h2 className="text-xl font-bold mb-[15px]">Caption</h2>
          <Textarea
            required
            name="caption"
            ref={textAreaRef}
            className="w-full lg:h-[150px] mb-[50px] outline-0 px-[25px] py-[15px] text-lg font-semibold italic tracking-wider border-1 border-slate-600 rounded-lg placeholder:text-lg"
            placeholder="Add Text...."
          />
        </div>

        <h2 className="text-xl font-bold mb-[15px]">Add Post</h2>
        <div className=" py-[50px] mb-[30px] border-2 border-slate-600 outline-0 rounded-lg flex flex-col justify-center items-center  text-center">
          <label className="cursor-pointer ">
            <FaImage className="text-[200px] text-gray-500" />
            <Input
              className="hidden"
              required
              type="file"
              name="content"
              ref={inputRef}
            />
            <p className="text-xl text-gray-400 font-bold mt-[20px]">
              Add Image OR Video
            </p>
          </label>
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
    </section>
  );
}

export default AddPost;
