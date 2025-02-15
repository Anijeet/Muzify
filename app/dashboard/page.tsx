"use client"
import React, { useEffect } from 'react'
import Undirect from '../components/Undirect'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import User from '../components/User'
import axios from 'axios'

const page = () => {
  const creatorId= "b8637442-9bdb-44e1-aad2-5b1fba0b63c7"
  return (
    <div className="bg-slate-900 min-h-screen w-full relative z-0">
        <Undirect/>
        <Navbar/>
        <Sidebar/>
        <User creatorId={creatorId}/>
    </div>
  )
}

export default page