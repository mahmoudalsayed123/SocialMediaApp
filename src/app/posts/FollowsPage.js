
import { getTopCreators } from "../_utils/postApi";
import { currentUser } from "@clerk/nextjs/server";
import FollowContainer from "./FollowContainer";

async function FollowsPage() {

  const user = await currentUser();
  const topCreators = await getTopCreators(
    user?.primaryEmailAddress.emailAddress
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
