"use client"
import { signOut, useSession } from 'next-auth/react';
import React from 'react'
import { BsMusicPlayerFill } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa';
import { IoArchiveSharp } from 'react-icons/io5';
import { MdHomeFilled } from "react-icons/md";


const Navbar = () => {
    const session= useSession()
  return (
    <div className='bg-slate-700 h-full fixed top-0 left-0 flex flex-col p-5 border-black border-r-2 w-32 items-center justify-between'>
        <div className='text-3xl flex flex-col w-32 items-center gap-7 text-gray-400 p-5 pt-10'>
            <BsMusicPlayerFill/>
            <MdHomeFilled/>
            <div>
            <FaRegHeart />
            </div>
            <div>
            <IoArchiveSharp />
            </div>
        </div>
        <div>
            {session.data?.user &&  <button className='p-2 bg-green-500 text-lg font-semibold border-2 border-green-800 hover:bg-transparent transition-all duration-300  rounded-lg hover:text-white' onClick={()=>{signOut()}}>Log Out</button>}
        </div>
    </div>
  )
}

export default Navbar