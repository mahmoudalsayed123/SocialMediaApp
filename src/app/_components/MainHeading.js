import React from "react";
import Image from "next/image";

const MainHeading = ({ name, url, width, height }) => {
  return (
    <div className="flex items-center mt-[30px] mb-[30px] sm:mb-[50px]">
      <Image
        src={`${url}`}
        alt={name}
        width={width}
        height={height}
        className="w-[35px] h-[35px] lg:w-[45px] lg:h-[45px] me-[10px]"
      />
      <h1 className="text-2xl lg:text-3xl font-bold mb-[5px]">{name}</h1>
    </div>
  );
};
export default MainHeading;
