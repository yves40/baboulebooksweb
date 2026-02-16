"use client"

import Link from 'next/link';

export default function NavbarTop() {
  
  const modulename = 'NavbarTop.jsx # ';
  const logtracker = 'APP # ';
  const version = "NavbarTop.jsx Feb 16 2026, 1.00";

  
  // When clicking on a menu link or anywhere on screen, close the menu if in mobile mode
  function clickMenuLink(e) {
      dispatch(toggleMenuStatus({menuvisible: false}));  
  }

  return (
    // Look in globals.css for classes definitions
    <nav className="navtop" onClick={clickMenuLink}>
      <div className=' top-0 fixed bg-(--menubackground) w-full'>
        <ul>
          <li className=' my-3 ml-3'><Link href="/" onClick={() => dispatch(setAppStatus({appstatus: 'mainmenu'}))}>
                            <img className="svg-white32"  
                            src="/svg/house-solid.svg" alt=""/></Link></li>
        </ul>
      </div>
    </nav>
  )
}


