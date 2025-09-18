import React from "react";

function SkeletonUserButton() {
  return (
    <>
      <div className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full animate-pulse bg-slate-600"></div>
      <h2 className="hidden lg:block w-[150px] h-[30px] ms-[10px] animate-pulse bg-slate-600"></h2>
    </>
  );
}

export default SkeletonUserButton;
