"use client"

import { useSelector, useDispatch } from 'react-redux'
import { useContext, useState, useEffect, useRef, useLayoutEffect } from "react"
import { AuthContext } from '@/app/context/authContext';
import { AppContext } from '@/app/context/appContext';
import { toggleMenuStatus, setActiveBreakpoint } from "@/redux/menuProperties"

import Link from 'next/link';

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Jan 14 2026, 1.34";
  const menustate = useSelector((state) => state.menuProperties);
  const {isUserLogged} = useContext(AuthContext);
  const { getNavigationstate, setOnAdminPages } = useContext(AppContext); 
  const adminpage = getNavigationstate().onAdminPages;
  const [userstatus, setUserstatus] = useState(false) // Not logged
  const thenav = useRef(null);
  const [size, setSize] = useState([0, 0]);
  const dispatch = useDispatch();

  // On component mount, check if user is logged
  useEffect(() => {
    const userstate = isUserLogged();
    setUserstatus(userstate);
  }, [])
  // Show or hide menu based on menustatus in redux store
  useEffect(() => {    
    if(menustate.menustatus) {
      thenav.current.style.display = "flex";
      thenav.current.classList.add("slide-right-in");
      thenav.current.classList.remove("slide-right-out");
    } else {
      thenav.current.classList.remove("slide-right-in");
      thenav.current.classList.add("slide-right-out");
      thenav.current.style.display = "none";
    }
  }, [menustate.menustatus])
  // Handle window resize to get current size
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
      const breakpoint= getActiveBreakpoint();
      dispatch(setActiveBreakpoint({activebreakpoint: breakpoint}));
      if(breakpoint !== 'mobile') {
        thenav.current.style.display = "flex";
        dispatch(toggleMenuStatus({menuvisible: true}));    
      }else {
        thenav.current.style.display = "none";
        dispatch(toggleMenuStatus({menuvisible: false}));  
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  // Determine active breakpoint, based on tailwind standard definitions
  function getActiveBreakpoint() {
    if (window.matchMedia('(min-width: 1280px)').matches) {
        return 'xl';
    } else if (window.matchMedia('(min-width: 1024px)').matches) {
        return 'lg';
    } else if (window.matchMedia('(min-width: 768px)').matches) {
        return 'md';
    } else if (window.matchMedia('(min-width: 640px)').matches) {
        return 'sm';
    } else {
        return 'mobile';
    }
  };


  return (

    // Look in globals.css for classes definitions

      <nav ref={thenav} className="nav slideRightIn">
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              <li><Link href="/" onClick={() => setOnAdminPages(false)}><img className="svg-white32"  src="/svg/house-solid.svg" alt=""/></Link></li>
              {(userstatus && !adminpage) && 
              <>
                  <li><Link href="/bookshome">Livres</Link></li>
                  <li><Link href="/adminhome" onClick={() => setOnAdminPages(true)}>Administrer</Link></li>
                  <li><Link href="/logout">Déconnexion</Link></li>
                  <li><p>{menustate.useremail}</p></li>
              </>}
              {(userstatus && adminpage) && 
              <>
                <li><Link href="/adminbooks">Gérer les livres</Link></li>
                <li><Link href="/adminusers" >Gérer les utilisateurs</Link></li>
                  <li><Link href="/logout">Déconnexion</Link></li>
                  <li><p>{menustate.useremail}</p></li>
              </>}
              {!userstatus && 
              <>
                  <li><Link href="/bookshome">Livres</Link></li>
                  <li ><Link className=' sm:block' href="/login">Connexion</Link></li>
                  <li ><Link className=' sm:block' href="/register">S'enregister</Link></li>
              </>}
            </ul>
          </div>

        </div>
      </nav>
  )
}


