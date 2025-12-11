"use client";

import { useClerk } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut({ redirectUrl: `/sign-in` })}
      className="cursor-pointer md:flex md:items-center md:gap-[10px]"
    >
      <Image
        src="/assets/icons/logout.svg"
        alt="logOut"
        width={20}
        height={20}
      />
      <h2 className="hidden md:block">LogOut</h2>
    </button>
  );
};
