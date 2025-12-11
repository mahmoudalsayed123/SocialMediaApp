import { createUser } from "./_utils/postApi";
import PostsSection from "./posts/page";
import { currentUser } from "@clerk/nextjs/server";

async function Home({ searchParams }) {
  const user = await currentUser();

  if (user) {
    const newUser = {
      userName: user?.firstName,
      email: user?.primaryEmailAddress.emailAddress,
      avatar: user?.imageUrl,
    };
    await createUser(newUser);
  }

  return (
    <div className="lg:px-[50px] ">
      <PostsSection searchParams={searchParams} />
    </div>
  );
}

export default Home;
