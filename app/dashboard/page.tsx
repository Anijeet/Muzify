"use client"
import React, { useEffect } from 'react'
import Undirect from '../components/Undirect'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import User from '../components/User'
import axios from 'axios'

const page = () => {
  // const INTERVAL_MS=10*1000

  // async function refershStream(){
  //   const res= await axios.get('api/streams/my')
    
  // }

  // useEffect(()=>{
  //   refershStream();
  //   const interval= setInterval(() => {
      
  //   }, INTERVAL_MS);
  // },[])
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