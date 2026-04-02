"use client"

import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux'
import { setAppStatus } from "@/redux/menuProperties"


export default function NavbarBooks() {
  
  const version = "NavbarBooks.jsx Jan 18 2026, 1.01";
  const modulename = 'NavbarBooks.jsx # ';
  const menustate = useSelector((state) => state.menuProperties);
  const dispatch = useDispatch();
  
  return (
    <>
        <li><Link href="/bookshome" onClick={() => dispatch(setAppStatus({appstatus: 'searchbooks'}))}>Livres</Link></li>
        <li><Link href="/authors" onClick={() => dispatch(setAppStatus({appstatus: 'topauthors'}))}>Top auteurs</Link></li>
        <li><Link href="/editors" onClick={() => dispatch(setAppStatus({appstatus: 'topeditors'}))}>Top éditeurs</Link></li>
    </>
  )
}



