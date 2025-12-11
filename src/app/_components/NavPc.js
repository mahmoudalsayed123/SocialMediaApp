"use client";
import React from "react";
import UserAvatar from "./UserAvatar";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@/app/_components/SignOutButton";

const NavPc = ({ linkes }) => {
  const pathName = usePathname();
  return (
    <div className="hidden md:flex flex-col justify-between fixed">
      <div>
        <Logo />
        <UserAvatar />
      </div>

      <div>
        <ul>
          {linkes.map((item) => (
            <Link
              href={item.route}
              key={item.name}
              className={cn(
                "w-[170px] mb-[20px] flex items-center gap-[15px] px-[10px] py-[13px] rounded-lg transition-all duration-300 group hover:bg-violet-500",
                pathName === item.route && "bg-violet-600",
              )}
            >
              <Image
                src={item.url}
                alt={item.name}
                width={20}
                height={20}
                className={cn(
                  " transition group-hover:brightness-0 group-hover:invert group-hover:transition",
                  pathName === item.route && "invert brightness-0 transition",
                )}
              />

              <p
                className={cn(
                  "text-md font-bold transition group-hover:text-white",
                  pathName === item.route && "text-white",
                )}
              >
                {item.name}
              </p>
            </Link>
          ))}
        </ul>
      </div>

      <div className="w-full relative top-[100px] left-[30px] ">
        <SignOutButton />
      </div>
    </div>
  );
};
export default NavPc;
