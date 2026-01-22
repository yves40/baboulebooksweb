"use client"

import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setAppStatus } from "@/redux/menuProperties"


export default function NavbarAdmin() {
  
  const version = "NavbarAdminDetails.jsx jan 22 2026, 1.03";
  const dispatch = useDispatch();
 
  return (
    <>
        <li><Link href="/adminbooks" onClick={() => dispatch(setAppStatus({appstatus: 'adminbookss'}))}>Gérer les livres</Link></li>
        <li><Link href="/adminusers" onClick={() => dispatch(setAppStatus({appstatus: 'adminusers'}))}>Gérer les utilisateurs</Link></li>
      </>
  )
}



