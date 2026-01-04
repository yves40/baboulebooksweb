"use client"

import { useContext, useEffect } from "react"
import Link from 'next/link';
import { AuthContext } from '@/app/context/authContext';

const modulename = 'Navbar.jsx # ';

export default function NavbarAdmin() {

  const version = "NavbarAdmin.jsx Dec 26 2025, 1.00";
  const {isUserLogged, getUser} = useContext(AuthContext);
  let userstatus = isUserLogged();;
  let user;

  useEffect(() => {
    console.log(`******************* ${userstatus}`);
  }, [])

      
  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="topmenu">
          <div className="nav-links">
            <ul>
              <li><Link href="/" onClick={() => setOnAdminPages(false)}><img className="svg-bigwhite"  src="/svg/house-solid.svg" alt=""/></Link></li>
              {(userstatus) && 
              <>
                <li><Link href="/adminbooks">Gérer les livres</Link></li>
                <li><Link href="/adminusers" >Gérer les utilisateurs</Link></li>
                  <li><Link href="/logout">Déconnexion</Link></li>
                  <li><p>{getUser().email}</p></li>
              </>}
            </ul>
          </div>

        </div>
      </nav>
  )
}



