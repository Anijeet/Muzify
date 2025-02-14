"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import React from 'react'

const Redirect = () => {
const session = useSession();
const router = useRouter();
if(session?.data?.user){
    router.push('/dashboard')
}

  return null
}

export default Redirect