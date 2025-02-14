"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const Undirect = () => {
const session = useSession();
const router = useRouter();
if(!session?.data?.user){
    router.push('/')
}

  return null
}

export default Undirect