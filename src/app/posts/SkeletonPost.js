import React from "react";

function SkeletonPost() {
  return (
    <>
      <div className="flex items-center gap-3 mb-6 animate-pulse">
        <div>
          <div className="w-[70px] h-[70px] rounded-full animate-pulse bg-slate-600" />
        </div>

        <div>
          <h2 className="text-lg lg:text-xl lg:ms-[5px] font-bold mb-5 animate-pulse w-[200px] h-[30px] bg-slate-600"></h2>
          <p className=" ms-[5px] w-[120px] h-[25px] animate-pulse bg-slate-600"></p>
        </div>
      </div>

      <div>
        <p className="ms-5 mb-5 text-lg lg:text-xl lg:mb-[30px] tracking-wide leading-8 w-[500px] h-[30px] animate-pulse bg-slate-600"></p>
        <div>
          <div className=" rounded-lg ms-[10px] w-[500px] h-[400px] animate-pulse bg-slate-600"></div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-[30px] gap-[30px] w-[530px]">
        <div className="w-[70px] h-[70px] rounded-full animate-pulse bg-slate-600"></div>
        <div className="w-[70px] h-[70px] rounded-full animate-pulse bg-slate-600"></div>
      </div>
    </>
  );
}

export default SkeletonPost;
