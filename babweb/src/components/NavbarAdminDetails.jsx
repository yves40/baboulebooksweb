"use client"

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setAppStatus } from "@/redux/menuProperties"


export default function NavbarAdminDetails() {
  
  const version = "NavbarAdminDetails.jsx Feb 20 2026, 1.04";
  const dispatch = useDispatch();
 
  return (
    <>
        <li><Link href="/adminbooks" onClick={() => dispatch(setAppStatus({appstatus: 'adminbooks'}))}>Gérer les livres</Link></li>
        <li><Link href="/adminusers" onClick={() => dispatch(setAppStatus({appstatus: 'adminusers'}))}>Gérer les utilisateurs</Link></li>
      </>
  )
}



