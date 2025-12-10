"use client"
import { useState } from "react";
import Link from "next/link"
import { useContext, useEffect } from "react";
import { AuthContext } from "@/app/context/authContext";
import { useSelector } from 'react-redux'

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  const toto = useSelector((state) => state.menuProperties);
  console.log(`***************** ${JSON.stringify(toto)}`);
  

  const version = "Navbar.jsx Dec 10 2025, 1.15";
  const {getUser, isUserLogged} = useContext(AuthContext);
  const [sessionstatus, setSessionstatus] =  useState("Non connecté");
  
  useEffect(() => {
    const loginsection = document.getElementById("loginsection");
    const logoutsection = document.getElementById("logoutsection");
    if(isUserLogged()) {
      const user = getUser();
      // setSessionstatus(user.getEmail());
      setSessionstatus(`Connecté`);
      loginsection.hidden = true;
      logoutsection.hidden = false;
    }
    else {
      setSessionstatus("Non connecté");
      loginsection.hidden = false;
      logoutsection.hidden = true;
    }
  }, []); // One call at component mount only
  
  function refreshNavbar() {
    console.log(`${modulename} refreshNavbar called`);
    const loginsection = document.getElementById("loginsection");
    const logoutsection = document.getElementById("logoutsection"); 
    console.log(`Refreshing navbar`);
    
  }

  return (
    // Look in globals.css for classes definitions
      <nav className="nav">
        <div className="nav__div">
            <Link href="/" className=" mr-2 text-zinc-900">Accueil</Link>
            <Link href="/books" className=" mx-2 text-zinc-900">Livres</Link>
            <div id="logoutsection" hidden>
              <Link href="/logout" className=" mx-2 text-zinc-900 mr-auto">Déconnexion</Link>
            </div>
            <div id="loginsection" hidden>
              <Link href="/login" className=" mx-2 text-zinc-900">Connexion</Link>
              <Link href="/register" className=" mx-2 text-zinc-900">S'enregister</Link>
            </div>
            <p>{sessionstatus}</p>
        </div>
      </nav>
  )
}


