"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/app/context/appContext"


function Header() {

  const appctx = useContext(AppContext);
  const [elapsed, setElapsed] = useState(0);


  useEffect(() => {
        const timeID = setInterval(() => {
          setElapsed(elapsed + 1);
        }, 1000);
        // console.log('Header updated');
        return () => { 
          clearInterval(timeID) ; 
        }
      }, [elapsed]); // Array parameter and specific variable, useEffect called every time state changes
      // }); // No array parameter, useEffect called every time state changes
      // }, []); // Array parameter, useEffect called once at mount time

      // console.log('Header mount');
      
  return (
    <header className="news">
      <div className="news__div--left">
        <h3 className=" font-bold">Les news</h3>
        <p>Rien à signaler depuis le début du mois.</p>
        <p>Les derniers livres achetés n'ont pas encore été rentrés dans la base.</p>
        <p>Elapsed (sec) : {elapsed}</p>
        <p>Errors 404 : {appctx.getErrors404()}</p>
        <p>Errors     : {appctx.getErrors()}</p>
      </div>
    </header>
  )
}

export default Header