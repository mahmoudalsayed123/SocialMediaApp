import Image from "next/image";
import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/posts" className="block md:pt-[40px] md:mb-[40px]">
      <div className="flex justify-start items-center transition-opacity">
        <Image
          src="/assets/images/logo.svg"
          width={150}
          height={150}
          alt="logo"
        />
      </div>
    </Link>
  );
}

export default Logo;
