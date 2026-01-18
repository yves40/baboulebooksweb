"use client"

import { useSelector } from 'react-redux'
import { useState as usestate } from "react"
const modulename = 'Navbar.jsx # ';

export default function NavbarBooks() {

  const version = "NavbarBooks.jsx Jan 18 2026, 1.01";
  const menustate = useSelector((state) => state.menuProperties);
  const [adminpage, setAdminpage] = usestate(false);
      
  return (
    <>
        <li><a href="/bookshome">Livres</a></li>
        <li><a href="/authors">Top auteurs</a></li>
        <li><a href="/editors">Top éditeurs</a></li>
    </>
  )
}



