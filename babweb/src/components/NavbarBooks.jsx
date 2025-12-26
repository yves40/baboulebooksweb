"use client"

import { useSelector } from 'react-redux'
import { useState as usestate } from "react"
const modulename = 'Navbar.jsx # ';

export default function NavbarBooks() {

  const version = "NavbarBooks.jsx Dec 26 2025, 1.00";
  const menustate = useSelector((state) => state.menuProperties);
  const [adminpage, setAdminpage] = usestate(false);
      
  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              <li><a href="/" onClick={() => setAdminpage(false)}><img className="svg-bigwhite"  src="/svg/house-solid.svg" alt=""/></a></li>
                  <li><a href="/bookshome">Recherches</a></li>
                  <li><a href="/authors">Top auteurs</a></li>
                  <li><a href="/editors">Top éditeurs</a></li>
            </ul>
          </div>

        </div>
      </nav>
  )
}


