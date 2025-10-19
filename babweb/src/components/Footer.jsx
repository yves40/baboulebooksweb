"use client"

import Link from "next/link"
import { useContext } from "react"
import { getAppContext } from "@/app/appContext"


function Footer() {
  const appData = getAppContext();  
  return (
    <footer className="footer">
      <Link href="#">{`${appData.AppInfo.version}`}</Link>
    </footer>
  )
}

export default Footer