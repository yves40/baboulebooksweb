"use client"

import { useEffect } from 'react'
import { useRouter } from "next/navigation";

export default function page() {

  const router = useRouter(); 
  
  useEffect(() => {
    handleLogout();
  }, [])  // Called once

  async function handleLogout() {
    console.log('LOGOUT');
    router.push('/');
        // const result = await logout();
        // if(result.success) {
        //     setIsAuthenticated({loading: false, isConnected: false, userId: null });
        //     if(await isPrivatePage(window.location.pathname)) {
        //         router.push('/signin');
        //     }
        // }
  }    

  return (
    <div></div>
  )
}
