"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaImage } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { addPost, getUserByEmail } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";
import { LuImagePlus } from "react-icons/lu";
import { redirect, useRouter } from "next/navigation";
import Back from "@/app/_components/Back";
import MainHeading from "@/app/_components/MainHeading";
import Image from "next/image";

function AddPost() {
  const { user } = useUser();

  const router = useRouter();

  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

  const [userActive, setUserActive] = useState("");

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress.emailAddress).then((data) => {
        setUserActive(data[0]);
      });
    },
    [user?.primaryEmailAddress.emailAddress],
  );

  function handleSubmite(e) {
    if (textAreaRef.current.value && inputRef.current.value) {
      e.preventDefault();
      const newPost = {
        text: textAreaRef.current.value,
        content: inputRef.current.files[0],
        userPostId: userActive.id,
      };

      addPost(newPost);
      handleClearFields();
      handleCancelFields();
    }
  }

  function handleClearFields() {
    textAreaRef.current.value = "";
  }

  function handleCancelFields() {
    router.push("/posts");
  }

  return (
    <>
      <Back />
      <section className="px-[20px] pb-[30px] mt-[50px]">
        <MainHeading
          name="Create Post"
          url="/assets/icons/add-post.svg"
          width={30}
          height={30}
        />
        <form>
          <div className="mb-[30px]">
            <p className="text-md font-semibold mb-[10px]">Name</p>
            <Textarea
              required
              name="caption"
              ref={textAreaRef}
              className="w-full px-[10px] pt-[10px] pb-[50px] text-gray-300 tracking-wider outline-0 rounded-md bg-gray-900 border border-gray-800 transition-all duration-300 focus:border-gray-600 placeholder:text-md "
              placeholder="Add Text...."
            />
          </div>
          <p className="text-md font-semibold mb-[10px]">Add Photos</p>

          <div className="mb-[30px] border-2 border-slate-600 outline-0 rounded-lg ">
            <label className="py-[50px] h-full flex flex-col justify-center items-center cursor-pointer">
              <Image
                src="/assets/icons/file-upload.svg"
                alt="upload photo"
                width={100}
                height={100}
                className="cursor-pointer"
              />
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
        </form>
        <div className="w-[100%] flex justify-between items-center">
          <div>
            {" "}
            <Button
              onClick={handleClearFields}
              className=" px-[15px] py-[5px] rounded-lg bg-slate-600 text-md me-[15px] hover:bg-slate-500 cursor-pointer"
            >
              Clear
            </Button>
          </div>
          <div>
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
        </div>
      </section>
    </>
  );
}

export default AddPost;
