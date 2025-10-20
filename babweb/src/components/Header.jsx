"use client"

import { useContext, useEffect, useRef, useState } from "react"
import { AppContext } from "@/app/appContext"


function Header() {

  const appctx = useContext(AppContext);
  let errors = appctx.getErrors404();
  const counter = useRef(0);
  const [score, setScore] = useState(0);


  useEffect(() => {
        const timeID = setInterval(() => {
          counter.current += 1;
          console.log((counter.current));
          setScore(score + 1);
        }, 1000);
        return cleanup(timeID);
      }, []);

  function cleanup(td) {
    clearInterval(td);
  }

  return (
    <header className="header">
      <div className="header__div--left">
        <h3 className=" font-bold">Les news</h3>
        <p>Rien à signaler depuis le début du mois.</p>
        <p>Les derniers livres achetés n'ont pas encore été rentrés dans la base.</p>
        <p>Counter : {counter.current}</p>
        <p>Score : {score}</p>
      </div>
    </header>
  )
}

export default Header