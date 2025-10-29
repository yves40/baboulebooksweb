"use client"

import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { getUserIdentity } from '@/app/context/authContext';

export default function page() {

  const router = useRouter(); 
  const {setUserIdentity} = getUserIdentity();
  useEffect(() => {
    handleLogout();
  }, [])  // Called once

  async function handleLogout() {
    router.push('/');
    setUserIdentity({
          isConnected: false,
          userEmail: '',
          userId: 0
    });
  }    

  return (
    <div></div>
  )
}
