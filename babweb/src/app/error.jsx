"use client"

import Link from "next/link"
import { AppContext } from "./context/appContext"
import { useContext, useEffect } from "react";
export default function error() {

  const appctx = useContext(AppContext);
  useEffect(() => {

  }, []);

  return (
    <div className=" pt-44 text-center">
        <h1 className=" text-4xl mb-4">Une erreur est survenue, appelez Yves</h1>
        <Link href="/" className="underline">Home</Link>
    </div>
  )
}
