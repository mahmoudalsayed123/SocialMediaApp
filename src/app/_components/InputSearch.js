"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const InputSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const filterPosts = searchParams.get("topic") || "";

  useEffect(() => {
    if (searchQuery) {
      router.push(`/posts/?topic=${searchQuery}`);
    } else {
      router.push(`/posts`);
    }
  }, [searchQuery, filterPosts, router]);

  return (
    <div className="relative mb-[20px]">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        name="searchPosts"
        type="text"
        placeholder="Search For Posts"
        className="w-full px-[40px] py-[12px] outline-0 rounded-md bg-gray-800 border border-gray-800 transition-all duration-300 focus:border-gray-600 placeholder:text-md "
        defaultValue={filterPosts}
      />
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="absolute top-[50%] left-[10px] transform translate-y-[-50%] "
      />
    </div>
  );
};

export default InputSearch;
