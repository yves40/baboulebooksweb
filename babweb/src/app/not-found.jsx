"use client"

import Link from "next/link"
import { AppContext } from "./context/appContext"
import { useContext, useEffect } from "react";

export default function notfound() {
  
  const appctx = useContext(AppContext);
  useEffect(() => {
    appctx.incErrors404();
  }, []);

  return (
    <div className="news">
        <h1 className=" text-4xl py-4">404 - Not found</h1>
        <p className="mb-2 text-red-500 ">La page demandée n'a pas été trouvée</p>
        <p className="my-4 text-gray-700 px-8">Contactez l'administrateur au 06.88.33.55.66<br/>
          Il est très disponible et s'efforcera de résoudre ce problème dans les meilleurs délais.
          En dépit de son immense charge de travail pour développer cette application. 
          Si en dépit de ses efforts le délai contractuel de résolution ( 12H ) n'était pas respecté
          vous pouver signaler cette anomalie et demander des indemnisations conséquentes en 
          envoyant un mail à : poubelle.delespace@blackhole.com
        </p>
        <p className=" mb-2 text-red-500 ">Could not find requested resource</p>
        <p className=" my-4 text-gray-700 px-8">Please contact the site admin on 06.88.33.55.66<br/>
          He's very nice and will solve the problem in the best delay.
          Despite the fact that he's currently developing the next version of this outstanding application. 
          Anyway, if the 12 hours resolution engagement is not met, feel free to send an email 
          to poubelle.delespace@blackhole.com to start a contract rule violation procedure, which will 
          trigger a thorough examination of all facts and most probably trigger a lawsuit.
        </p>
        <Link href="/" className=" text-blue-500 font-bold text-2xl mb-10">Return Home</Link>
    </div>
  )
}
