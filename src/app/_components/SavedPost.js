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
import Image from "next/image";

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
    [user?.primaryEmailAddress?.emailAddress],
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
    const newSave = {
      postId: postUserId,
      userId: userSession,
    };

    addSave(newSave, userSession.id);
  }

  return (
    <div
      onClick={handleAddSave}
      className="cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 group"
    >
      {isClicked ? (
        <Image
          src="/assets/icons/saved.svg"
          alt="save post"
          width={25}
          height={25}
        />
      ) : (
        <Image
          src="/assets/icons/save.svg"
          alt="save post"
          width={25}
          height={25}
        />
      )}
    </div>
  );
}
