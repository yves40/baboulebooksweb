"use client"

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { setAppStatus } from "@/redux/menuProperties"

const modulename = 'Navbar.jsx # ';

export default function NavbarBooks() {

  const version = "NavbarBooks.jsx Jan 18 2026, 1.01";
  const menustate = useSelector((state) => state.menuProperties);
  const dispatch = useDispatch();
  
  return (
    <>
        <li><a href="/bookshome" onClick={() => dispatch(setAppStatus({appstatus: 'searchbooks'}))}>Livres</a></li>
        <li><a href="/authors" onClick={() => dispatch(setAppStatus({appstatus: 'topauthors'}))}>Top auteurs</a></li>
        <li><a href="/editors" onClick={() => dispatch(setAppStatus({appstatus: 'topeditors'}))}>Top éditeurs</a></li>
    </>
  )
}



