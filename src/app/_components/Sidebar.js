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
import { IoBookmark } from "react-icons/io5";

function Sidebar() {
  const [userId, setUserId] = useState(null);

  const pathName = usePathname();

  const { user } = useUser();

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress.emailAddress).then((res) => {
        if (res.length > 0) {
          setUserId(res[0].id);
        }
      });
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
    <div className="lg:col-span-1 lg:w-[300px] lg:block lg:min-h-screen border-e">
      {/* Mobile Bottom Navigation */}

      <div className="lg:hidden  bottom-0 left-0 right-0  backdrop-blur-xl border-t border-dark-700 z-50 shadow-glow">
        {/* User Avatar Section */}
        {/* <div className="mb-8 px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 hover:bg-dark-800 hover:border-primary-500/30 transition-all">
          <UserAvatar />
        </div> */}
        <ul className="flex items-center justify-around px-2 py-2 mt-[20px]">
          <>
            <li className="me-[10px] ms-[10px]">
              <UserAvatar />
            </li>
            {linkes.map((link) => (
              <li key={link.id}>
                <Link
                  href={`${link.route}`}
                  className={`flex flex-col items-center justify-center rounded-xl px-[20px] py-[8px] transition-all duration-300 hover:bg-violet-700 ${
                    pathName === link.route
                      ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow bg-violet-700"
                      : "text-dark-400 hover:text-white hover:bg-dark-800 hover:bg-violet-700"
                  }`}
                >
                  <span className="text-xl">{link.icons}</span>
                </Link>
              </li>
            ))}
          </>
        </ul>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 bg-dark-900/50 backdrop-blur-md border-r border-dark-700 min-h-screen px-6 py-8 w-[300px]">
        {/* Logo */}
        <div className="mb-8">
          <Logo />
        </div>

        {/* User Avatar Section */}
        <div className="mb-8 px-4 py-3 rounded-xl bg-dark-800/50 border border-dark-700 hover:bg-dark-800 hover:border-primary-500/30 transition-all">
          <UserAvatar />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {linkes.map((link) => (
            <Link
              key={link.id}
              href={`${link.route}`}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-violet-700/50 ${
                pathName === link.route
                  ? " bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-glow bg-violet-700"
                  : "text-dark-400 hover:text-white hover:bg-dark-800 hover:bg-violet-700 "
              }`}
            >
              <span
                className={`text-xl transition-transform group-hover:scale-110 ${
                  pathName === link.route ? "text-white" : "text-dark-400"
                }`}
              >
                {link.icons}
              </span>
              <span className="font-semibold text-base">{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
