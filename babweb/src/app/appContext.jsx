/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useContext, useState, useEffect } from "react";

export const AppContext =createContext();
console.log(`AppContext triggered`);

export function AppProvider({children}) {

  const version = 'baboulebooks &copy; : Oct 19 2025 : 1.12';
  const [AppInfo, setAppInfo] = useState( {
    homeVisits: 0,
    Errors404: 0
  })

  useEffect( () => {
    console.log(`useEffect() in AppContext with errors set to : ${AppInfo.Errors404}`); 
  }, []);

  function incErrors404() {
    const newAppInfo = {...AppInfo};
    newAppInfo.Errors404++;
    setAppInfo(newAppInfo);
  }
  function getVersion() {
    return version;
  }
  function getErrors404() {
    return AppInfo.Errors404;
  }
  
  return (
    <AppContext.Provider value={{AppInfo, incErrors404, getVersion, getErrors404}}>
      {children}
    </AppContext.Provider>
  )
}
