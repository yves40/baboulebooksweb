"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/app/context/appContext"


function Header() {

  const appctx = useContext(AppContext);
  const [elapsed, setElapsed] = useState(0);
  
  
  /**
   * Remember some features of useEffect()
   * No array parameter: useEffect called every time state changes
   * Empty Array parameter: useEffect called once at mount time
   * Array parameter with a list of states, called each time the state changes
   */
  useEffect(() => {
        const timeID = setInterval(() => {
          setElapsed(elapsed + 1);
        }, 1000);
        return () => { 
          clearInterval(timeID) ; 
        }
      }, [elapsed]); // Array parameter and specific variable, useEffect called every time state changes
      
  return (
    <header className="news">
      <div className="news__div--left">
        <h3 className=" font-bold">Les news</h3>
        <p>
          Rien à signaler depuis le début du mois.
          Les derniers livres achetés n'ont pas encore été rentrés dans la base.
          Mais beaucoup de lectures récentes vont arriver!
        </p>
        <p>Elapsed (sec) : {elapsed}</p>
      </div>
    </header>
  )
}

export default Header