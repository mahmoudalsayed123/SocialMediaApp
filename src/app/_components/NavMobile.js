import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import UserAvatar from "./UserAvatar";
import { SignOutButton } from "./SignOutButton";

const NavMobile = ({ linkes }) => {
  const pathName = usePathname();
  return (
    <>
      <div className="md:hidden flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-[30px]">
          <SignOutButton />
          <UserAvatar />
        </div>
      </div>

      <div className=" md:hidden bg-black fixed bottom-0 left-0 w-full px-[20px] py-[5px] z-50">
        <ul className="w-full flex justify-between items-center gap-[20px] ">
          {linkes.map((item) => (
            <Link
              href={`${item.route}`}
              key={item.id}
              className={cn(
                "rounded-lg px-[6px] py-[4px] hover:bg-violet-500 transition-all duration-300 group",
                pathName === item.route && "bg-violet-600",
              )}
            >
              <Image
                src={item.url}
                alt={item.name}
                width={20}
                height={20}
                className={cn(
                  "m-auto group-hover:invert group-hover:brightness-0 group-hover:transition",
                  pathName === item.route && "invert brightness-0 transition",
                )}
              />
              <span className="text-[12px]">
                {item.name === "Create Post" ? "Create" : item.name}
              </span>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};
export default NavMobile;
