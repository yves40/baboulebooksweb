"use client"

import Link from "next/link"
// import { useAuth } from "@/app/AuthContext";
import Image from "next/image";

const modulename = 'Navbar.jsx # ';

export default function Navbar() {

  // const {isAuthenticated} = useAuth();  

  return (
    // Look in globals.css for classes definitions
    <nav className="nav">
      <div className="nav__div">
          <Link href="/" className=" mr-2 text-zinc-900">Home</Link>
          <Link href="/books" className=" mx-2 text-zinc-900 mr-auto">Books</Link>
      </div>
    </nav>
  )
}
