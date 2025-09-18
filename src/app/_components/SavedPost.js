'use client'
import React, { useEffect, useState } from 'react'
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { addSave, getSaves, getUserByEmail } from '../_utils/postApi';
import { useUser } from '@clerk/nextjs';

function SavedPost({ postUserId }) {

    const { user } = useUser();

    const [userSessionId, setUserSessionId] = useState(null)

    const [allSaves, setAllSaves] = useState([]);

    const [isClicked, setIsClicked] = useState(false);



    useEffect(function () {
        getUserByEmail(user?.primaryEmailAddress.emailAddress).then((res) => setUserSessionId(res.id));

    }, [user?.primaryEmailAddress.emailAddress])

    useEffect(function () {
        getSaves(postUserId,userSessionId).then((res) => {
            setAllSaves(res)
        })
    }, [postUserId, userSessionId])

    useEffect(function () {
        allSaves.find((e) => {
            setIsClicked(userSessionId === e.userId)
        })
    }, [allSaves, userSessionId])

    function handleAddSave() {
        setIsClicked((e) => !e)
        const newSave = {
            postId: postUserId,
            userId: userSessionId
        }

        addSave(newSave, userSessionId)
    }

    return (
        <div onClick={handleAddSave}>
            {isClicked ? <IoBookmark className=' text-3xl' /> : <IoBookmarkOutline className='text-3xl' />}
        </div>
    )
}

export default SavedPost
