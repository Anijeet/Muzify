"use client"

import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { BsMusicPlayerFill } from "react-icons/bs";

const Appbar = () => {
    const session = useSession()
  return (
    <div className=' fixed top-0 flex w-full justify-between p-2 pt-6 px-5'>
        <div className='flex items-center gap-1 text-gray-300 text-3xl font-mono'><BsMusicPlayerFill/><span>Muzify</span></div>
        <div>
            {session.data?.user &&  <button className='p-2 bg-green-500 text-lg font-semibold border-2 border-green-800 hover:bg-transparent transition-all duration-300  rounded-lg hover:text-white' onClick={()=>{signOut()}}>Log Out</button>}
            {!session.data?.user && <button className='p-2 bg-green-500 text-lg font-semibold border-2 border-green-800 hover:bg-transparent transition-all duration-300 rounded-lg hover:text-white' onClick={()=>{signIn()}}>SignIn</button>}
        </div>
    </div>
  )
}

export default Appbar