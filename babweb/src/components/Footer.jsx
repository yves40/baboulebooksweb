"use client"

import Link from "next/link"
import { useContext } from "react";
import { AppContext } from "@/app/context/appContext"



function Footer() {

  const appctx = useContext(AppContext);
  return (
    <footer className="footer">
      <ul>
        <li><a href="/">&copy;  {`${appctx.getVersion()}`}</a></li>
        <li className=" ml-auto"><a><img className="svg-bigwhite sm:hidden" src="/svg/bars-solid.svg" alt="" /></a></li>        
      </ul>
    </footer>
  )
}

export default Footer