"use client"

import Link from "next/link"
import { useSelector, useStore } from 'react-redux'
import NavbarDropdown from "./NavbarDropdown";

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Dec 17 2025, 1.19";
  const userstate = useSelector((state) => state.menuProperties);
  const store = useStore();
      
  return (

    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="nav__div">
            <Link href="/" className=" mr-2 text-zinc-900">Accueil</Link>
            <Link href="/bookshome" className=" mx-2 text-zinc-900">Livres</Link>
            {userstate.logged && <div id="logoutsection" className="flex">
              <NavbarDropdown/>
              <Link href="/logout" className=" mx-2 text-zinc-900 mr-auto">Déconnexion</Link>
            </div>}
            {!userstate.logged && <div id="loginsection">
              <Link href="/login" className=" mx-2 text-zinc-900">Connexion</Link>
              <Link href="/register" className=" mx-2 text-zinc-900">S'enregister</Link>
            </div>}
            <p className=" ml-auto font-semibold">{userstate.useremail}</p>
        </div>
      </nav>
  )
}


