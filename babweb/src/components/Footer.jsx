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
        <li className=" ml-4"><p >&copy;  {`${appctx.getVersion()}`}</p></li>
        <li className=" ml-auto mr-4">
            <img onClick={toggleMenu} className="svg-bigwhite" 
                  src="/svg/bars-solid.svg" alt="" />
        </li>        
      </ul>
    </footer>
  )
}

export default Footer