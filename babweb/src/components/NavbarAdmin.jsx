"use client"

import { useContext } from "react"
import Link from 'next/link';


export default function NavbarAdmin() {
  
  const version = "NavbarAdmin.jsx jan 18 2026, 1.02";
      
  return (
    <>
        <li><Link href="/adminbooks">Gérer les livres</Link></li>
        <li><Link href="/adminusers" >Gérer les utilisateurs</Link></li>
      </>
  )
}



