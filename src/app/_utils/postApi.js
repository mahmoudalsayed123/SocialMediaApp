// /src/app/_utils/postApi.js
import { supabase } from "@/lib/supabase";

/*
  Clean & final postApi.js
  - No maybeSingle()
  - No server-only helpers (we use the single browser client)
  - Fixed logical bugs (addSave, createFollow, getAllUserWithoutMe, ...)
  - Upload helper centralised
*/

// ---------------------------- CONFIG / HELPERS ----------------------------
const SUPABASE_URL = "https://slwbaobgpnqfloovztsy.supabase.co";

const handleError = (msg) => {
    console.error("Supabase Error:", msg);
    throw new Error(msg);
};

const uploadImage = async (bucket, file) => {
    const imageName = `${Math.random()}-${file.name}`.replaceAll("/", "").replaceAll(" ", "");
    const { error } = await supabase.storage.from(bucket).upload(imageName, file, {
        cacheControl: "3600",
        upsert: false,
    });

    if (error) handleError(error.message);

    return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${imageName}`;
};

// ---------------------------- USER SERVICES ----------------------------
export async function createUser(newUser) {
    const { data: exists, error: selectError } = await supabase
        .from("user")
        .select("*")
        .eq("email", newUser.email);

    if (selectError) handleError(selectError.message);

    if (!exists || exists.length === 0) {
        const { error: insertError } = await supabase.from("user").insert([newUser]);
        if (insertError) handleError(insertError.message);
    }
}

export async function getUserByEmail(email) {
    const { data, error } = await supabase.from("user").select("*").eq("email", email);
    if (error) handleError(error.message);
    return data;
}

export async function getAllUserInfoByEmail(email) {
    const { data, error } = await supabase.from("user").select("*").eq("email", email);
    if (error) handleError(error.message);
    return data && data.length > 0 ? data[0] : null;
}

export async function getUserByid(id) {
    const { data, error } = await supabase.from("user").select("*").eq("id", id);
    if (error) handleError(error.message);
    return data && data.length > 0 ? data[0] : null;
}

export async function getAllUserWithoutMe(id) {
    const { data, error } = await supabase.from("user").select("*").neq("id", id);
    if (error) handleError(error.message);
    return data;
}

export async function updateUserIfo(id, newUserInfo) {
    let avatarPath = newUserInfo.avatar;
    const avatarIsExternal = avatarPath?.startsWith?.(SUPABASE_URL) === true;

    if (!avatarIsExternal && newUserInfo.avatar) {
        avatarPath = await uploadImage("avatar-user", newUserInfo.avatar);
    }

    const { data, error } = await supabase
        .from("user")
        .update([{ ...newUserInfo, avatar: avatarPath }])
        .eq("id", id)
        .select();

    if (error) handleError(error.message);
    return data;
}

// ---------------------------- POSTS SERVICES ----------------------------
export async function addPost(post) {
    let contentPath = post.content;
    const isExternal = contentPath?.startsWith?.(SUPABASE_URL) === true;

    if (!isExternal && post.content) {
        contentPath = await uploadImage("post-content", post.content);
    }

    const { data, error } = await supabase
        .from("posts")
        .insert([{ ...post, content: contentPath }])
        .select();

    if (error) handleError(error.message);
    return data;
}

export async function getPost(topic = "") {
    let query = supabase.from("posts").select("*");
    if (topic) query = query.ilike("text", `%${topic}%`);
    const { data, error } = await query;
    if (error) handleError(error.message);
    return data;
}

export async function getPostById(id) {
    const { data, error } = await supabase.from("posts").select("*").eq("id", id);
    if (error) handleError(error.message);
    return data && data.length > 0 ? data[0] : null;
}

export async function getPostsById(id) {
    const { data, error } = await supabase.from("posts").select("*").eq("userPostId", id);
    if (error) handleError(error.message);
    return data;
}

// ---------------------------- LIKE SERVICES ----------------------------
export async function addLike(newLike, userId) {
    const { data: exists, error: selectError } = await supabase
        .from("likes")
        .select("*")
        .eq("userId", userId)
        .eq("postId", newLike.postId);

    if (selectError) handleError(selectError.message);

    if (!exists || exists.length === 0) {
        const { error } = await supabase.from("likes").insert([newLike]);
        if (error) handleError(error.message);
        return { created: true };
    } else {
        const { error } = await supabase
            .from("likes")
            .delete()
            .eq("userId", userId)
            .eq("postId", newLike.postId);

        if (error) handleError(error.message);
        return { removed: true };
    }
}

export async function getLikes(userId) {
    const { data, error } = await supabase.from("likes").select("*").eq("userId", userId);
    if (error) handleError(error.message);
    return data;
}

export async function getPostsByLike(id) {
    const { data, error } = await supabase.from("likes").select("posts(*)").eq("userId", id);
    if (error) handleError(error.message);
    return (data || []).map((item) => item.posts);
}

// ---------------------------- FOLLOW SERVICES ----------------------------
export async function createFollow(newFollow) {
    const { data: exists, error: selectError } = await supabase
        .from("follows")
        .select("*")
        .eq("followedId", newFollow.followedId)
        .eq("followerId", newFollow.followerId);

    if (selectError) handleError(selectError.message);

    if (!exists || exists.length === 0) {
        const { error } = await supabase.from("follows").insert([newFollow]);
        if (error) handleError(error.message);
        return { created: true };
    } else {
        const { error } = await supabase
            .from("follows")
            .delete()
            .eq("followedId", newFollow.followedId)
            .eq("followerId", newFollow.followerId);

        if (error) handleError(error.message);
        return { removed: true };
    }
}

export async function getFollows(userId) {
    if (!userId) return [];
    const { data, error } = await supabase.from("follows").select("*").eq("followerId", userId);
    if (error) handleError(error.message);
    return data;
}

export async function getFollowers(userId) {
    const { data, error } = await supabase.from("follows").select("*").eq("followedId", userId);
    if (error) handleError(error.message);
    return data;
}

// ---------------------------- SAVE SERVICES ----------------------------
export async function addSave(newSave) {
    const { data: exists, error: selectError } = await supabase
        .from("saves")
        .select("*")
        .eq("userId", newSave.userId)
        .eq("postId", newSave.postId);

    if (selectError) handleError(selectError.message);

    if (!exists || exists.length === 0) {
        const { error } = await supabase.from("saves").insert([newSave]);
        if (error) handleError(error.message);
        return { created: true };
    } else {
        const { error } = await supabase
            .from("saves")
            .delete()
            .eq("userId", newSave.userId)
            .eq("postId", newSave.postId);

        if (error) handleError(error.message);
        return { removed: true };
    }
}

export async function getSaves(userId) {
    if (!userId) return [];
    const { data, error } = await supabase.from("saves").select("*").eq("userId", userId);
    if (error) handleError(error.message);
    return data;
}

export async function getAllSaves(userId) {
    const { data, error } = await supabase.from("saves").select("posts(*)").eq("userId", userId);
    if (error) handleError(error.message);
    return data;
}

// ---------------------------- TOP CREATORS ----------------------------
export async function getTopCreators(emailUserSession) {
    const { data, error } = await supabase.from("user").select("*").neq("email", emailUserSession);
    if (error) handleError(error.message);
    return data;
}

// ---------------------------- CHAT / CONVERSATION ----------------------------
export async function createConversation(userId, otherId) {
    const [id1, id2] = userId < otherId ? [userId, otherId] : [otherId, userId];
    const { data: exists, error: selectError } = await supabase
        .from("conversation")
        .select("*")
        .eq("user_id", id1)
        .eq("other_id", id2);

    if (selectError) handleError(selectError.message);

    if (!exists || exists.length === 0) {
        const { error } = await supabase.from("conversation").insert([{ user_id: id1, other_id: id2 }]);
        if (error) handleError(error.message);
        return { created: true };
    } else {
        return exists;
    }
}

export async function getConversation(otherId, userId) {
    const [id1, id2] = userId < otherId ? [userId, otherId] : [otherId, userId];
    const { data, error } = await supabase.from("conversation").select("*").eq("user_id", id1).eq("other_id", id2);
    if (error) handleError(error.message);
    return data;
}

export async function deleteConversation(id) {
    const { data, error } = await supabase.from("conversation").delete().eq("id", id);
    if (error) handleError(error.message);
    return data;
}

export async function createMessage(newMessage) {
    const { data, error } = await supabase.from("message").insert([newMessage]).select().single();
    if (error) handleError(error.message);
    return data;
}

export async function getAllMessage(convId) {
    const { data, error } = await supabase
        .from("message")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

    if (error) handleError(error.message);
    return data;
}

export function subscribeToMessages(conversationId, onNewMessage) {
    const channel = supabase
        .channel(`chat-room-${conversationId}`)
        .on(
            "postgres_changes",
            {
                event: "INSERT",
                schema: "public",
                table: "message",
                filter: `conversation_id=eq.${conversationId}`,
            },
            (payload) => onNewMessage(payload.new)
        )
        .subscribe();

    return () => supabase.removeChannel(channel);
}
