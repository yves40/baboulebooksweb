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

  const [AppInfo, setAppInfo] = useState( {
    homeVisits: 0,
    version: 'baboulebooks &copy; : Oct 19 2025 : 1.10',
    Errors404: 0
  })

  // useEffect( () => {
  //   console.log(`useEffect() in AppContext`);
  // }, []);

  return (
    <AppContext.Provider value={{AppInfo, setAppInfo}}>
      {children}
    </AppContext.Provider>
  )
}
export function getAppContext() { return useContext(AppContext)}
export function getErrors404() { return useContext(AppContext).AppInfo.Errors404}
