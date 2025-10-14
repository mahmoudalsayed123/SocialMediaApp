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
      className=" p-4 lg:p-5 px-6 lg:px-8 mx-2 text-xl rounded-4xl lg:rounded-6xl outline-0 mb-[20px] bg-slate-900 "
    />
  );
};

export default InputSearch;
