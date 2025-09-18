import React, { useEffect, useState } from "react";
import { getTopCreators } from "../_utils/postApi";
import { useUser } from "@clerk/nextjs";
import FollowContainer from "./FollowContainer";

function FollowsPage() {
  const [topCreators, setTopCreators] = useState([]);

  const { user } = useUser();

  useEffect(
    function () {
      getTopCreators(user?.primaryEmailAddress.emailAddress).then((res) =>
        setTopCreators(res)
      );
    },
    [user?.primaryEmailAddress.emailAddress]
  );

  return (
    <>
      <h2 className="text-3xl lg:text-5xl lg:mb-[30px] font-bold w-fit h-fit px-[20px] lg:px-0">
        Top Creators
      </h2>
      <div className=" grid grid-cols-2 px-[50px] py-[40px] gap-[60px]">
        {topCreators.map((creator) => (
          <FollowContainer key={creator.id} creator={creator} />
        ))}
      </div>
    </>
  );
}

export default FollowsPage;
