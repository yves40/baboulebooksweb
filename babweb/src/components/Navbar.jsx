"use client"

import { useSelector, useDispatch } from 'react-redux'
import { useContext, useState, useEffect, useRef, useLayoutEffect } from "react"
import { AuthContext } from '@/app/context/authContext';
import { toggleMenuStatus, setActiveBreakpoint, setAppStatus } from "@/redux/menuProperties"

import Link from 'next/link';
import NavbarAdmin from './NavbarAdmin';
import NavbarAdminDetails from './NavbarAdminDetails'
import NavbarTop from './NavbarTop';
import NavbarBooks from './NavbarBooks';
import NavbarLogged from './NavbarLogged';
import NavbarNotLogged from './NavbarNotLogged';


export default function Navbar() {
  
  const modulename = 'Navbar.jsx # ';
  const logtracker = 'APP # ';
  const version = "Navbar.jsx Feb 16 2026, 1.40";

  const menustate = useSelector((state) => state.menuproperties);
  const {isUserLogged} = useContext(AuthContext);
  const [userstatus, setUserstatus] = useState(false) // Not logged
  const thenav = useRef(null);
  const dispatch = useDispatch();

  // On component mount, check if user is logged
  useEffect(() => {
    const userstate = isUserLogged();
    setUserstatus(userstate);
  }, [])

  // Show or hide menu based on menustatus in redux store
  useEffect(() => {    
    if( isMenuHidden()) {
      if(menustate.menustatus) {
        thenav.current.classList.remove("slide-right-out");
        thenav.current.classList.add("slide-right-in");
      } else {
        thenav.current.classList.remove("slide-right-in");
        thenav.current.classList.add("slide-right-out");
      }
    }
    else {
      thenav.current.classList.remove("slide-right-in");
      thenav.current.classList.remove("slide-right-out");
    }
  }, [menustate.menustatus])
  
  // Handle window resize to get current size
  useLayoutEffect(() => {
    function updateSize() {
      const breakpoint = getActiveBreakpoint();
      dispatch(setActiveBreakpoint({activebreakpoint: breakpoint}));
      if(isMenuHidden()) {
        dispatch(toggleMenuStatus({menuvisible: false}));    
      }else {
        dispatch(toggleMenuStatus({menuvisible: true}));  
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  
  // Determine active breakpoint, based on tailwind standard definitions
  function getActiveBreakpoint() {
    if (typeof window !== 'undefined') {
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
    }
  };
  
  // When clicking on a menu link or anywhere on screen, close the menu if in mobile mode
  function clickMenuLink(e) {
    if( isMenuHidden()  ) {
      dispatch(toggleMenuStatus({menuvisible: false}));  
    }
  }

  function isMenuHidden() {
    return menustate.activebreakpoint === 'mobile' || menustate.activebreakpoint === 'sm'
            || menustate.activebreakpoint === 'md';
  }

  console.info(`${logtracker} Application status : ${menustate.appstatus} User logged : ${menustate.logged} \
    Screen mode : ${menustate.activebreakpoint}`);
  
  return (
    // Look in globals.css for classes definitions
    <>
    {isMenuHidden() &&
      <NavbarTop/>
    }
    <nav ref={thenav} className="nav" onClick={clickMenuLink}>
      <div className="topmenu">
        <div className="nav-links">
          <ul>
            <li><Link href="/" onClick={() => dispatch(setAppStatus({appstatus: 'mainmenu'}))}>
                              <img className="svg-white32"  
                              src="/svg/house-solid.svg" alt=""/></Link></li>
            {menustate.logged && 
              <>
                <NavbarAdminDetails />
                <NavbarLogged />
              </>
            } 
            {!menustate.logged && 
            <>
              <NavbarBooks />
              <NavbarNotLogged />
            </>
            }
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}


