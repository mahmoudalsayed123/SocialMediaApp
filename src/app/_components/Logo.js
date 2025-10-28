import Image from "next/image";
import React from "react";
import logo from "./../../../public/images/logo.png";
function Logo() {
  return (
    <div className="flex items-center transition-opacity">
      <Image
        className="rounded-xl"
        src={logo || null}
        width={100}
        height={100}
        alt="logo"
      />
      <h1 className="ms-[-25px] text-2xl font-bold  bg-clip-text ">
        Com Social
      </h1>
    </div>
  );
}

export default Logo;
