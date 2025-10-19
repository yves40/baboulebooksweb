"use client"

import Link from "next/link"
import { useContext } from "react";
import { AppContext } from "./appContext";

export default function error() {

  const appctx = useContext(AppContext);
  appctx.incErrors404();

  return (
    <div className=" pt-44 text-center">
        <h1 className=" text-4xl mb-4">Une erreur est survenue, appelez Yves</h1>
        <Link href="/" className="underline">Home</Link>
    </div>
  )
}
