"use client"

import Link from "next/link"
import { useContext } from "react";
import { AppContext } from "@/app/appContext"



function Footer() {

  const appctx = useContext(AppContext);
  return (
    <footer className="footer">
      <Link href="#">{`${appctx.getVersion()}`}</Link>
    </footer>
  )
}

export default Footer