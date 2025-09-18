import Image from 'next/image'
import React from 'react'
import logo from './../../../public/images/logo.png'
function Logo() {
    return (
        <div className=' hidden lg:flex items-center ms-[-50px]'>
            <Image className='bg-black me-[-50px]' src={logo || null} width={150} height={150} alt='logo' />
            <h1 className='text-2xl font-semibold'>SocialTeam</h1>
        </div>
    )
}

export default Logo
