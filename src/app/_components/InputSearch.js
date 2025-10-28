"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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
    <input
      onChange={(e) => setSearchQuery(e.target.value)}
      name="searchPosts"
      type="text"
      placeholder="Search For Posts"
      className="w-full p-3 sm:p-4 lg:p-5 px-5 sm:px-6 lg:px-8 text-base sm:text-lg lg:text-xl rounded-3xl sm:rounded-4xl lg:rounded-6xl outline-0 mb-4 sm:mb-5 lg:mb-6 bg-slate-900/70 border border-slate-700/50 text-white placeholder:text-gray-400 focus:border-violet-500 focus:bg-slate-900 transition-all"
      defaultValue={filterPosts}
    />
  );
};

export default InputSearch;
