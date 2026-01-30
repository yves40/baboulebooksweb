"use client"

import { useContext, useState } from "react";
import { AppContext } from "@/app/context/appContext"
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuStatus } from "@/redux/menuProperties"


function Footer() {

  const menustate = useSelector((state) => state.menuproperties);
  const dispatch = useDispatch();
  let menustatus = menustate.menustatus;
  
  function toggleMenu(e) {
    dispatch(toggleMenuStatus({menuvisible: !menustatus}));
    menustatus = !menustatus;
  }

  const appctx = useContext(AppContext);
  return (
    <footer className="footer">
      <ul>
        <li className="footer__version ml-4"><p >&copy;  {`${appctx.getVersion()}`}</p></li>
        <li className="footer__pizzabox">
            <img className="svg-white48" onClick={toggleMenu}
                  src="/svg/bars-solid.svg" alt="" />
        </li>        
      </ul>
    </footer>
  )
}

export default Footer