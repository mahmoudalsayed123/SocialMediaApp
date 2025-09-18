import { supabase } from "@/lib/supabaseClient";

const supabaseUrl = "https://slwbaobgpnqfloovztsy.supabase.co";

export async function createUser(newUser) {
  // const hasImagePath = newUser.avatar?.startsWith?.(supabaseUrl);
  // const imageName = `${Math.random()}-${newUser.avatar}`.replaceAll("/", "").replaceAll(' ', '');
  // const imagePath = hasImagePath ? newUser.avatar : `${supabaseUrl}/storage/v1/object/public/avatar-user//${imageName}`

  const { data: existingUser } = await supabase
    .from("user")
    .select("*")
    .eq("email", newUser.email) // أو أي عمود مميز زي email
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase
      .from("user")
      .insert([newUser]);

    // if (hasImagePath) return data
    // //Store Or Upload Imgae to Supabase Sotrage
    // const { error: storageError } = await supabase
    //     .storage
    //     .from('avatar-user')
    //     .upload(imageName, newUser.avatar, {
    //         cacheControl: '3600',
    //         upsert: false
    //     })

    // // If There any error in upload an image not be upload it
    // if (storageError) {
    //     await supabase
    //         .from('user')
    //         .delete()
    //         .eq('id', newUser.id)
    //     console.log(storageError.message)
    //     throw new Error("Should be upload an image this is not be created a cabin")
    // }

    if (insertError) {
      console.error("Insert error:", insertError.message);
    }
  }
}

export async function getUserByEmail(email) {
  let { data, error } = await supabase
    .from("user")
    .select("id")
    .eq("email", email)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getAllUserInfoByEmail(email) {
  let { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getUserByid(id) {
  // let query = supabase.from("user");

  // if (id) {
  //   query = query.eq("id", id)
  // }

  // const { data, error } = await query.select();

  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function updateUserIfo(id, newUserInfo) {
  const hasImagePath = newUserInfo.avatar?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newUserInfo.avatar.name}`
    .replaceAll("/", "")
    .replaceAll(" ", "");
  const imagePath = hasImagePath
    ? newUserInfo.avatar
    : `${supabaseUrl}/storage/v1/object/public/avatar-user//${imageName}`;

  const { data, error } = await supabase
    .from("user")
    .update([{ ...newUserInfo, avatar: imagePath }])
    .eq("id", id)
    .select();

  const { error: storageError } = await supabase.storage
    .from("avatar-user")
    .upload(imageName, newUserInfo.avatar, {
      cacheControl: "3600",
      upsert: false,
    });

  // If There any error in upload an image not be upload it
  if (storageError) {
    await supabase.from("user").delete().eq("id", newUserInfo.id);
    console.log(storageError.message);
    throw new Error(
      "Should be upload an image this is not be Updated a User Info"
    );
  }

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getUserByLikes(userId) {
  let { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function addPost(post) {
  const hasImagePath = post.content?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${post.content.name}`
    .replaceAll("/", "")
    .replaceAll(" ", "");
  const imagePath = hasImagePath
    ? post.content
    : `${supabaseUrl}/storage/v1/object/public/post-content//${imageName}`;

  const { data, error } = await supabase
    .from("posts")
    .insert([{ ...post, content: imagePath }])
    .select();

  if (hasImagePath) return data;
  //Store Or Upload Imgae to Supabase Sotrage
  const { error: storageError } = await supabase.storage
    .from("post-content")
    .upload(imageName, post.content, {
      cacheControl: "3600",
      upsert: false,
    });

  // If There any error in upload an image not be upload it
  if (storageError) {
    await supabase.from("posts").delete().eq("id", post.id);
    console.log(storageError.message);
    throw new Error("Should be upload an image this is not be created a cabin");
  }

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getPost() {
  let { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getPostsByLike(id) {
  const { data, error } = await supabase
    .from("likes")
    .select("posts(*)")
    .eq("userId", id);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  let postsUserLiked = data.map((post) => post.posts);

  return postsUserLiked;
}

export async function getPostsById(id) {
  let { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("userPostId", id);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getPostById(id) {
  let { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function addLike(newLike, userId) {
  const { data: existingLike } = await supabase
    .from("likes")
    .select("*")
    .eq("userId", userId)
    .eq("postId", newLike.postId)
    .single();

  if (!existingLike) {
    const { error: insertError } = await supabase
      .from("likes")
      .insert([newLike]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
    }
  } else {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("userId", userId)
      .eq("postId", newLike.postId);

    if (error) {
      console.log(error.message);
      throw new Error("Could not remove like");
    }
  }
}

export async function getLikes(postId) {
  let { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("postId", postId);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

// Follower = اللي بيتابعني.

// Following = اللي أنا متابعه.

// Followed = الشخص اللي اتعمله متابعة (يعني النتيجة إن حد بقى متابَع).

export async function getTopCreators(emailUserSession) {
  let { data, error } = await supabase
    .from("user")
    .select("*")
    .neq("email", emailUserSession);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function createFollow(newFollow, userId) {
  const { data: existingUser } = await supabase
    .from("follows")
    .select("*")
    .eq("followedId", newFollow.followedId)
    .eq("followerId", userId)
    .single();

  if (!existingUser) {
    const { error: insertError } = await supabase
      .from("follows")
      .insert([newFollow]);

    if (insertError) {
      console.error("Insert error:", insertError.message);
    }
  } else {
    const { error } = await supabase
      .from("follows")
      .delete()
      .eq("followedId", newFollow.followedId);
  }

  return existingUser;
}

// برجعله اللي عاملي متابعه
export async function getFollows(userId) {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("followerId", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

// اللي انا عامللهم متابعه
export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from("follows")
    .select("*")
    .eq("followedId", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be Sellected A Follower");
  }

  return data;
}

export async function addSave(newSave, userId) {
  const { data: existingSave } = await supabase
    .from("saves")
    .select("*")
    .eq("userId", userId)
    .eq("postId", newSave.postId)
    .single();

  if (!existingSave) {
    const { error: insertError } = await supabase
      .from("saves")
      .insert([newSave]);

    if (existingSave) {
      console.error("Insert error:", insertError.message);
    }
  } else {
    const { error } = await supabase
      .from("saves")
      .delete()
      .eq("userId", userId)
      .eq("postId", newSave.postId);

    if (error) {
      console.log(error.message);
      throw new Error("Could not remove like");
    }
  }
}

export async function getSaves(postId, userId) {
  let { data, error } = await supabase
    .from("saves")
    .select("*")
    .eq("postId", postId)
    .eq("userId", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}

export async function getAllSaves(userId) {
  let { data, error } = await supabase
    .from("saves")
    .select("posts(*)")
    .eq("userId", userId);

  if (error) {
    console.log(error.message);
    throw new Error("Could not Be created a Cabin");
  }

  return data;
}
