"use client"
import Navbar from '@/app/components/Navbar'
import Sidebar from '@/app/components/Sidebar'
import Undirect from '@/app/components/Undirect'
import User from '@/app/components/User'
import React, { useEffect } from 'react'


function page ({ params }: { params: Promise<{ creatorId: string }> }) {
    const { creatorId } = React.use(params);
  return (
    <div className="bg-slate-900 min-h-screen w-full relative z-0">
        {/* <Undirect/> */}
        <Navbar/>
        <Sidebar/>
        <User creatorId={creatorId}/>
    </div>
  )
}

export default page