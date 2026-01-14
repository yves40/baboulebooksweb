"use client"

import { useContext, useState } from "react";
import { AppContext } from "@/app/context/appContext"
import { useDispatch, useSelector } from "react-redux";
import { toggleMenuStatus } from "@/redux/menuProperties"


function Footer() {

  const menustate = useSelector((state) => state.menuProperties);
  const [menustatus, setMenustatus] = useState(menustate.menustatus);
  const dispatch = useDispatch();

  
  function toggleMenu(e) {
    e.preventDefault();
    if(menustatus) {
      setMenustatus(false);
    } else {
      setMenustatus(true);
    }
    const dispatchObj =  dispatch(toggleMenuStatus({menuvisible: menustatus}));    
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