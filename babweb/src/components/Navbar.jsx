"use client"

import { useSelector } from 'react-redux'
import { useState as usestate } from "react"
const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Dec 24 2025, 1.23";
  const menustate = useSelector((state) => state.menuProperties);
  const [adminpage, setAdminpage] = usestate(false);
      
  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        {/* <div className="nav__div">
            <Link href="/" className="svgnormal-blue nav__title text-zinc-900 mr-6"
              onClick={() => setAdminpage(false)}><img src="/svg/house-solid.svg" alt="" /></Link>
            {(menustate.logged && !adminpage) && 
              <div id="logoutsection" className="flex">
                <Link href="/bookshome" className=" mx-2 text-zinc-900">Livres</Link>
                <Link href="#" className=" mx-2 text-zinc-900 mr-auto" onClick={() => setAdminpage(!adminpage)}>Administrer</Link>
              </div>}
            {(menustate.logged && adminpage) && 
              <div id="logoutsection" className="flex">
                <Link href="/adminbooks" className=" mx-2 text-zinc-900 mr-auto hover:font-bold">Gérer les livres</Link>
                <Link href="/adminusers" className=" mx-2 text-zinc-900 mr-auto hover:font-bold">Gérer les utilisateurs</Link>
              </div>}
            {menustate.logged  && 
              <div id="logoutsection" className="flex">
                <Link href="/logout" className=" mx-2 text-zinc-900 mr-auto">Déconnexion</Link>
              </div>}
            {!menustate.logged && <div id="loginsection">
              <Link href="/bookshome" className=" mx-2 text-zinc-900">Livres</Link>
              <Link href="/login" className=" mx-2 text-zinc-900">Connexion</Link>
              <Link href="/register" className=" mx-2 text-zinc-900">S'enregister</Link>
            </div>}
            <p className=" ml-auto font-semibold">{menustate.useremail} </p>
        </div> */}
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


