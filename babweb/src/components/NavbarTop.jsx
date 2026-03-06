"use client"

import Link from 'next/link';

export default function NavbarTop() {
  
  const modulename = 'NavbarTop.jsx # ';
  const logtracker = 'APP # ';
  const version = "NavbarTop.jsx Feb 19 2026, 1.01";

  
  return (
    // Look in globals.css for classes definitions
      <div className='navtop'>
        <ul>
          <li className=' my-3 ml-3'>
              <Link href="/" onClick={() => dispatch(setAppStatus({appstatus: 'mainmenu'}))}>
                <img className="svg-white32"  src="/svg/house-solid.svg" alt=""/>
              </Link></li>
        </ul>
      </div>
  )
}
