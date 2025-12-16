"use client"
import { useState } from "react";
import Link from "next/link"
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/authContext";
import { useSelector, useStore } from 'react-redux'

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const version = "Navbar.jsx Dec 15 2025, 1.18";
  console.log(`${version} render`);
  const userstate = useSelector((state) => state.menuProperties);
  console.log(`***************** ${JSON.stringify(userstate)}`);
  const store = useStore();
  console.log(`***************** Store state: ${JSON.stringify(store.getState())}`);
    
  // const [userstatus, setUserStatus] =  useState(userstate);
  // setUserStatus(userstate);

  // useEffect(() => {    
  //   setUserStatus(userstate);
  // }, [userstatus]);
  
  // function refreshNavbar() {
  //   console.log(`${modulename} refreshNavbar called`);
  //   const loginsection = document.getElementById("loginsection");
  //   const logoutsection = document.getElementById("logoutsection");
  //   if(userstatus.logged) {
  //     loginsection.hidden = true;
  //     logoutsection.hidden = false;
  //   }
  //   else {
  //     loginsection.hidden = false;
  //     logoutsection.hidden = true;
  //   }
  // }
    
  return (
    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="nav__div">
            <Link href="/" className=" mr-2 text-zinc-900">Accueil</Link>
            <Link href="/books" className=" mx-2 text-zinc-900">Livres</Link>
            {userstate.logged && <div id="logoutsection">
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


