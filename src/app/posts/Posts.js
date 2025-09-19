'use client';
import React, { useEffect, useState } from 'react'
import Post from './Post'
import img1 from '../../../public/images/1.jpg'
import { useUser } from '@clerk/nextjs';
import { getPost } from '../_utils/postApi';


function Posts() {

    const [posts,setPosts] = useState([]);

    useEffect(function () {
        getPost().then((res) => {
            setPosts(res)
        })
    }, [])


    return (
        <div className='grid grid-cols-1 gap-5'>
            {posts.map((post) =>
                <Post key={post.id} post={post} />
            )}
        </div>
    )
}

export default Posts
