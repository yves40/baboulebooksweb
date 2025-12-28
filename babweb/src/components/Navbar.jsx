"use client"

import { useSelector } from 'react-redux'
import { useState as usestate } from "react"
const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Dec 28 2025, 1.26";
  const menustate = useSelector((state) => state.menuProperties);
  const [adminpage, setAdminpage] = usestate(false);

  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              <li><a href="/" onClick={() => setAdminpage(false)}><img className="svg-bigwhite"  src="/svg/house-solid.svg" alt=""/></a></li>
              {(menustate.logged && !adminpage) && 
              <>
                  <li><a href="/bookshome">Livres</a></li>
                  <li><a href="#" onClick={() => setAdminpage(true)}>Administrer</a></li>
                  <li><a href="/logout">Déconnexion</a></li>
                  <li><p>{menustate.useremail}</p></li>
              </>}
              {(menustate.logged && adminpage) && 
              <>
                <li><a href="/adminbooks">Gérer les livres</a></li>
                <li><a href="/adminusers" >Gérer les utilisateurs</a></li>
                  <li><a href="/logout">Déconnexion</a></li>
                  <li><p>{menustate.useremail}</p></li>
              </>}
              {!menustate.logged && 
              <>
                  <li><a href="/bookshome">Livres</a></li>
                  <li ><a className='hidden sm:block' href="/login">Connexion</a></li>
                  <li ><a className='hidden sm:block' href="/register">S'enregister</a></li>
              </>}
            </ul>
          </div>

        </div>
      </nav>
  )
}


