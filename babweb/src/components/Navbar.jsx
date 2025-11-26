"use client"

import Link from "next/link"
import Image from "next/image";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const {session, user} = useContext(AuthContext);

  if(user != undefined && user.getId()) {
    console.log(`${modulename} Navbar render - User ID : ${user.getId()} - Email : ${user.getEmail()}`);
  } else {
    console.log(`${modulename} Navbar render - No user logged in`);
  }

  return (
    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="nav__div">
            <Link href="/" className=" mr-2 text-zinc-900">Accueil</Link>
            <Link href="/books" className=" mx-2 text-zinc-900">Livres</Link>

            { session.isConnected() &&  
            <>
              <Link href="/logout" className=" mx-2 text-zinc-900 mr-auto">Déconnexion</Link>
              <p>{user.getEmail()}</p>
            </>
            }
            { !session.isConnected() &&  
            <>
              <Link href="/login" className=" mx-2 text-zinc-900">Connexion</Link>
              <Link href="/register" className=" mx-2 text-zinc-900">S'enregister</Link>
            </>
            }
        </div>
      </nav>
  )
}
