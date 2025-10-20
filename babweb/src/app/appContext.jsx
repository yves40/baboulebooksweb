/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useContext, useState, useEffect, useRef } from "react";

export const AppContext =createContext();
console.log(`AppContext triggered`);

export function AppProvider({children}) {

  const version = 'baboulebooks &copy; : Oct 20 2025 : 1.16';
  const errors = useRef(0);

  function incErrors404() {
    errors.current += 1;
  }
  function getVersion() {
    return version;
  }
  function getErrors404() {
    return errors.current;
  }
  
  return (
    <AppContext.Provider value={{incErrors404, getVersion, getErrors404}}>
      {children}
    </AppContext.Provider>
  )
}
