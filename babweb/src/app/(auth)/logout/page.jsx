"use client"

import { useContext, useEffect } from 'react'
import { useRouter } from "next/navigation";
import { getSession } from '@/app/context/authContext';
import User from '@/classes/User';
import Session from '@/classes/Session';

export default function page() {

  const router = useRouter(); 
  const {user, session, setSession, setUser } = getSession();
  
  useEffect(() => {
    handleLogout();
  }, [])  // Called once

  async function handleLogout() {
    user.logout();
    setSession(new Session());
    setUser(new User());
    router.push('/');
  }    

  return (
    <div></div>
  )
}
