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
      getUserByEmail(user?.primaryEmailAddress.emailAddress).then((data) => {
        setUserActive(data[0]);
      });
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
    <section className="px-[15px] sm:px-[30px] lg:px-[50px] py-[30px] sm:py-[40px] lg:py-[50px] pe-[20px] sm:pe-[50px] lg:pe-[100px] lg:col-span-2 lg:ms-[-100px]">
      <h1 className="font-bold flex items-center gap-[8px] sm:gap-[10px] mb-[30px] sm:mb-[40px] lg:mb-[50px] text-2xl sm:text-3xl lg:text-4xl">
        <LuImagePlus className="text-2xl sm:text-3xl lg:text-4xl" />
        <span>Create Post</span>
      </h1>
      <form className="p-4 sm:p-5 mt-6 sm:mt-8 lg:mt-0 lg:p-0 w-full flex-col justify-center items-center gap-[15px] sm:gap-[20px]">
        <div>
          <h2 className="text-lg sm:text-xl font-bold mb-[10px] sm:mb-[15px]">
            Caption
          </h2>
          <Textarea
            required
            name="caption"
            ref={textAreaRef}
            className="w-full h-[120px] sm:h-[140px] lg:h-[150px] mb-[30px] sm:mb-[40px] lg:mb-[50px] outline-0 px-[15px] sm:px-[20px] lg:px-[25px] py-[12px] sm:py-[15px] text-sm sm:text-base lg:text-lg font-semibold italic tracking-wider border-1 border-slate-600 rounded-lg placeholder:text-sm sm:placeholder:text-base lg:placeholder:text-lg"
            placeholder="Add Text...."
          />
        </div>

        <h2 className="text-lg sm:text-xl font-bold mb-[10px] sm:mb-[15px]">
          Add Post
        </h2>
        <div className="py-[30px] sm:py-[40px] lg:py-[50px] mb-[20px] sm:mb-[25px] lg:mb-[30px] border-2 border-slate-600 outline-0 rounded-lg flex flex-col justify-center items-center text-center">
          <label className="cursor-pointer">
            <FaImage className="text-[80px] sm:text-[120px] lg:text-[200px] text-gray-500" />
            <Input
              className="hidden"
              required
              type="file"
              name="content"
              ref={inputRef}
            />
            <p className="text-base sm:text-lg lg:text-xl text-gray-400 font-bold mt-[10px] sm:mt-[15px] lg:mt-[20px]">
              Add Image OR Video
            </p>
          </label>
        </div>
        <div className="w-[100%] flex justify-end items-center gap-2 sm:gap-4">
          <Button
            onClick={handleClearFields}
            className="w-fit px-[15px] sm:px-[20px] lg:px-[30px] py-[12px] sm:py-[18px] lg:py-[25px] rounded-lg bg-slate-600 text-sm sm:text-base lg:text-lg me-[10px] sm:me-[15px] lg:me-[20px] hover:bg-slate-500 cursor-pointer transition-colors"
          >
            Clear
          </Button>
          <Button
            onClick={handleSubmite}
            className="w-fit px-[15px] sm:px-[20px] lg:px-[30px] py-[12px] sm:py-[18px] lg:py-[25px] rounded-lg bg-violet-600 text-sm sm:text-base lg:text-lg hover:bg-violet-500 cursor-pointer transition-colors"
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
}

export default AddPost;
