"use client";
import { useUser } from "@clerk/nextjs";
import {
  addSave,
  getAllSaves,
  getAllUserInfoByEmail,
  getSaves,
  getUserByEmail,
} from "../_utils/postApi";
import { useEffect, useState } from "react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";

export default function SavedPost({ postUserId }) {
  const { user } = useUser();
  const [userSession, setUserSession] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(
    function () {
      getUserByEmail(user?.primaryEmailAddress?.emailAddress).then((res) => {
        if (res.length > 0) {
          setUserSession(res[0].id);
        }
      });
    },
    [user?.primaryEmailAddress?.emailAddress]
  );

  useEffect(() => {
    if (userSession) {
      getSaves(userSession).then((res) => {
        if (res.length > 0) {
          const isPostSaved = res.find((save) => save.postId === postUserId);
          if (isPostSaved) {
            setIsClicked(true);
          }
        }
      });
    }
  }, [user?.primaryEmailAddress?.emailAddress, userSession, postUserId]);

  function handleAddSave() {
    setIsClicked((prev) => !prev);
    console.log(userSession);
    const newSave = {
      postId: postUserId,
      userId: userSession,
    };

    addSave(newSave, userSession.id);
  }

  return (
    <div onClick={handleAddSave} className="cursor-pointer">
      {isClicked ? (
        <IoBookmark className="text-3xl" />
      ) : (
        <IoBookmarkOutline className="text-3xl" />
      )}
    </div>
  );
}
