"use client"

import { useContext } from "react"
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setAppStatus } from "@/redux/menuProperties"


export default function NavbarAdmin() {
  
  const version = "NavbarAdmin.jsx jan 18 2026, 1.02";
  const dispatch = useDispatch();
      
  return (
    <>
        <li><Link href="/adminhome" onClick={() => dispatch(setAppStatus({appstatus: 'admindetails'}))}>Administrer</Link></li>
      </>
  )
}



