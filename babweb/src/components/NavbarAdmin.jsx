"use client"

import { useContext, useEffect } from "react"
import Link from 'next/link';
import { AuthContext } from '@/app/context/authContext';
import { AppContext } from "@/app/context/appContext";


const modulename = 'Navbar.jsx # ';

export default function NavbarAdmin() {
  
  const version = "NavbarAdmin.jsx jan 09 2026, 1.01";
  const {isUserLogged, getUser} = useContext(AuthContext);
  const { setOnAdminPages } = useContext(AppContext); 
  let userstatus = isUserLogged();;

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



