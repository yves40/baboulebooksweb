"use client"

import { useContext } from "react"
import { AppContext } from "@/app/appContext"


function Header() {

  const appctx = useContext(AppContext);
  const errors = appctx.getErrors404();
  
  return (
    <header className="header">
      <div className="header__div--left">
        <h3 className=" font-bold">Les news</h3>
        <p>Rien à signaler depuis le début du mois.</p>
        <p>Les derniers livres achetés n'ont pas encore été rentrés dans la base.</p>
        <p>Erreurs : {errors}</p>
      </div>
    </header>
  )
}

export default Header