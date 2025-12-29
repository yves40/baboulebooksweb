"use client"

import Link from "next/link"
import { useContext, useState } from "react";
import { AppContext } from "@/app/context/appContext"
import { useDispatch } from "react-redux";
import { toggleMenuStatus } from "@/redux/menuProperties"


function Footer() {

  const [menustatus, setMenustatus] = useState(false);
  const dispatch = useDispatch();
  
  function toggleMenu(e) {
    e.preventDefault();
    setMenustatus(!menustatus);
    const dispatchObj =  dispatch(toggleMenuStatus({menuvisible: menustatus}));    
  }

  const appctx = useContext(AppContext);
  return (
    <footer className="footer">
      <ul>
        <li><p>&copy;  {`${appctx.getVersion()}`}</p></li>
        <li className=" ml-auto"><a onClick={toggleMenu}><img className="svg-bigwhite sm:hidden" src="/svg/bars-solid.svg" alt="" /></a></li>        
      </ul>
    </footer>
  )
}

export default Footer