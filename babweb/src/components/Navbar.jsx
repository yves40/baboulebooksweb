"use client"

import Link from "next/link"
import { useSelector, useStore } from 'react-redux'
import { useState as usestate } from "react"
const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Dec 20 2025, 1.20";
  const userstate = useSelector((state) => state.menuProperties);
  const [adminpage, setAdminpage] = usestate(false);
  const store = useStore();
      
  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="nav__div">
            <Link href="/" className="svgnormal-blue nav__title text-zinc-900 mr-6"
              onClick={() => setAdminpage(false)}><img src="/svg/house-solid.svg" alt="" /></Link>
            {(userstate.logged && !adminpage) && 
              <div id="logoutsection" className="flex">
                <Link href="/bookshome" className=" mx-2 text-zinc-900">Livres</Link>
                <Link href="#" className=" mx-2 text-zinc-900 mr-auto" onClick={() => setAdminpage(!adminpage)}>Administrer</Link>
              </div>}
            {(userstate.logged && adminpage) && 
              <div id="logoutsection" className="flex">
                <Link href="/adminbooks" className=" mx-2 text-zinc-900 mr-auto hover:font-bold">Gérer les livres</Link>
                <Link href="/adminusers" className=" mx-2 text-zinc-900 mr-auto hover:font-bold">Gérer les utilisateurs</Link>
              </div>}
            {userstate.logged  && 
              <div id="logoutsection" className="flex">
                <Link href="/logout" className=" mx-2 text-zinc-900 mr-auto">Déconnexion</Link>
              </div>}
            {!userstate.logged && <div id="loginsection">
              <Link href="/bookshome" className=" mx-2 text-zinc-900">Livres</Link>
              <Link href="/login" className=" mx-2 text-zinc-900">Connexion</Link>
              <Link href="/register" className=" mx-2 text-zinc-900">S'enregister</Link>
            </div>}
            <p className=" ml-auto font-semibold">{userstate.useremail} </p>
        </div>
      </nav>
  )
}


