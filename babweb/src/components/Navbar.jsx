"use client"

import { useSelector } from 'react-redux'
import { useContext, useState, useEffect } from "react"
import { AuthContext } from '@/app/context/authContext';
import Link from 'next/link';

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Dec 29 2025, 1.29";
  const menustate = useSelector((state) => state.menuProperties);
  const {getUser, isUserLogged} = useContext(AuthContext);
  const [adminpage, setAdminpage] = useState(false);
  const [userstatus, setUserstatus] = useState(false) // Not logged

  useEffect(() => {
    const userstate = isUserLogged();
    setUserstatus(userstate);
  }, [])

  
  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              <li><Link href="/" onClick={() => setAdminpage(false)}><img className="svg-bigwhite"  src="/svg/house-solid.svg" alt=""/></Link></li>
              {(userstatus && !adminpage) && 
              <>
                  <li><Link href="/bookshome">Livres</Link></li>
                  <li><Link href="#" onClick={() => setAdminpage(true)}>Administrer</Link></li>
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
                  <li ><Link className='hidden sm:block' href="/login">Connexion</Link></li>
                  <li ><Link className='hidden sm:block' href="/register">S'enregister</Link></li>
              </>}
            </ul>
          </div>

        </div>
      </nav>
  )
}


