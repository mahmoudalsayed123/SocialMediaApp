import React from "react";

function SkeletonFollow() {
  return (
    <>
      <div className="flex items-center gap-[10px]">
        <div className="w-[50px] h-[50px] rounded-full mb-3 bg-slate-600 animate-pulse"></div>

        <h3 className=" bg-slate-600 animate-pulse w-[100px] h-[30px] mb-[30px] rounded-lg"></h3>
      </div>

      <button className=" rounded-lg w-[120px] h-[50px] bg-slate-600 animate-pulse block m-auto"></button>
    </>
  );
}

export default SkeletonFollow;
