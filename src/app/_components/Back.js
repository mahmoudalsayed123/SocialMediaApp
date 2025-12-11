"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  function backStep() {
    router.back();
  }
  return (
    <div className="mt-[30px] px-[20px] flex items-center gap-[5px]">
      <Image
        src="/assets/icons/back.svg"
        alt="back"
        width={25}
        height={25}
        className="cursor-pointer"
        onClick={backStep}
      />
      <p className="text-lg font-semibold">Back</p>
    </div>
  );
};
export default Back;
