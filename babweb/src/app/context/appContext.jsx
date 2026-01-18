/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useEffect, useState } from "react";

export const AppContext =createContext();
export function AppProvider({children}) {
  
  const version = 'baboulebooks, Jan 18 2026 : 1.59';
  const [navigationstate, setNavigationstate] = useState({
    onAdminPages: false,
  });

  useEffect(() => {
  }, []);

  function getVersion() {return version;}
  function setOnAdminPages(value) {
    setNavigationstate((prevState) => ({
      ...prevState,
      onAdminPages: value,
    }));
  }
  function getNavigationstate() {
    return navigationstate;
  }
  return (
    <AppContext.Provider value={
        {
          getVersion, getNavigationstate, setOnAdminPages
        }
      }>
      {children}
    </AppContext.Provider>
  )
}
