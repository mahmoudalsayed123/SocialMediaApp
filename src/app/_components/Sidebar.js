"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import UserAvatar from "./UserAvatar";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { getUserByEmail } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";

import { RiHome3Line } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoBookmark } from "react-icons/io5";

function Sidebar() {
  const [userId, setUserId] = useState(null);

  const pathName = usePathname();

  const { user } = useUser();

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress.emailAddress).then((res) =>
        setUserId(res.id)
      );
    },
    [user?.primaryEmailAddress.emailAddress]
  );

  const linkes = [
    {
      id: 0,
      name: "Home",
      route: "/posts",
      icons: (
        <RiHome3Line className=" text-3xl w-[20px] h-[30px] lg:w-full lg:h-full" />
      ),
    },
    {
      id: 1,
      name: "Profile",
      route: `/profile/${userId}`,
      icons: (
        <CgProfile className="text-3xl w-[20px] h-[50px] lg:w-full lg:h-full" />
      ),
    },
    {
      id: 3,
      name: "Saved Post",
      route: "/saves",
      icons: (
        <IoBookmark className="lg:text-2xl text-3xl w-[20px] h-[20px] lg:w-full lg:h-full" />
      ),
    },
  ];

  return (
    <div className=" rounded-lg flex items-center px-[20px] py-[30px] lg:col-span-1 italic lg:w-[300px] lg:block Lg:px-[50px] lg:py-[30px] lg:min-h-[100vh]">
      <Logo />
      <div className="ms-[20px] lg:w-full cursor-pointer mb-[20px] ">
        <UserAvatar />
      </div>
      <ul className=" w-full flex justify-evenly lg:justify-center items-center lg:gap-[20px] lg:flex-col lg:mt-[20px] ">
        {linkes.map((link) => (
          <li
            className={
              pathName === link.route
                ? "lg:text-xl lg:w-full px-[20px] py-[10px] h-[50px] lg:ps-[40px] flex  items-center rounded-lg transition-all duration-300  cursor-pointer bg-violet-600 hover:bg-violet-600 "
                : "lg:text-xl lg:w-full px-[20px] py-[10px] h-[50px] lg:ps-[40px] flex  items-center rounded-lg transition-all duration-300  cursor-pointer hover:bg-violet-600 "
            }
            key={link.id}
          >
            <Link
              href={`${link.route}`}
              className=" flex items-center gap-[10px] text-white font-semibold cursor-pointer transition-all rounded-lg duration-300 "
            >
              <p className="block">{link.icons}</p>
              <p className="hidden lg:block">{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
