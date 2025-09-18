'use client';
import React, { useEffect, useState } from 'react'
import Post from './Post'
import img1 from '../../../public/images/1.jpg'
import { useUser } from '@clerk/nextjs';
import { getPost } from '../_utils/postApi';

// Fetch Posts in here

// const posts = [
//     {
//         id: 13545, text: 'bla bla bla', content: img1, comments: [
//             { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//         ]
//     },
//     {
//         id: 13365, text: 'bla bla bla', content: img1, comments: [
//             { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//         ]
//     },
//     {
//         id: 15665, text: 'bla bla bla', content: img1, comments: [
//             { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//         ]
//     },
//     {
//         id: 4665, text: 'bla bla bla', content: img1, comments: [
//             { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//         ]
//     },
//     {
//         id: 56, text: 'bla bla bla', content: img1, comments: [
//             { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//         ]
//     },
//     {
//         id: 34, text: 'bla bla bla', content: img1, comments: [
//             { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//         ]
//     },
//     // {
//     //     id: 2, text: 'bla bla bla', content: v1, comments: [
//     //         { id: 1, text: 'comments comments comments comments comments ', content: '', user: {} }
//     //     ]
//     // },
// ]


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
