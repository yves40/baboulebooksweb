"use client"

import { useContext, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { AuthContext } from '@/app/context/authContext';
import User from '@/classes/clientUser';

export default function page() {

  const router = useRouter(); 

  const {setUser, session} = useContext(AuthContext);
  
  useEffect(() => {
    handleLogout();
  }, [])  // Called once

  async function handleLogout() {
    router.push('/');
    session.setSessionState(false);
    setUser(new User());
  }    

  return (
    <div></div>
  )
}
