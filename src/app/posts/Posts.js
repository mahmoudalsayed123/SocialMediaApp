import Post from "./Post";

import { getPost } from "../_utils/postApi";

import InputSearch from "../_components/InputSearch";

async function Posts({ filter }) {
  const name = filter?.topic || "";
  const posts = await getPost(name);

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5">
      <InputSearch />
      <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold w-fit px-[15px] sm:px-[20px] lg:px-0 mb-[15px] sm:mb-[20px]">
        Home Feed
      </h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Posts;
