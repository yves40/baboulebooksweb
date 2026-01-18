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
  const [applicationSection, setApplicationSection] = useState('public');

  useEffect(() => {
  }, []);

  function getVersion() {return version;}
  // Track the appliation activiy to set menu
  function setApplicationMode(value) {
    setApplicationSection((prevState) => ({
      ...prevState,
      setion: value,
    }));
  }
  function getApplicationMode() {
    return applicationSection;
  }
  return (
    <AppContext.Provider value={
        {
          getVersion, getApplicationMode, setApplicationMode
        }
      }>
      {children}
    </AppContext.Provider>
  )
}
