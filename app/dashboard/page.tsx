import React from 'react'
import Undirect from '../components/Undirect'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import User from '../components/User'

const page = () => {
  return (
    <div className="bg-slate-900 min-h-screen w-full relative z-0">
        <Undirect/>
        <Navbar/>
        <Sidebar/>
        <User/>
    </div>
  )
}

export default page