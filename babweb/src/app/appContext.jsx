/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useEffect, useState } from "react";

export const AppContext =createContext();

export function AppProvider({children}) {
  
  console.log(`AppContext mounted`);

  useEffect(() => {
    if(window.localStorage.getItem('errors') == null) {
      window.localStorage.setItem('errors', 0)
    }
  }, []);
  
  const version = 'baboulebooks &copy; : Oct 20 2025 : 1.21';
  const [ errors, setErrors ] = useState(0);

  function incErrors() {
    const current =parseInt(window.localStorage.getItem('errors')) ;
    setErrors(current + 1);
    window.localStorage.setItem('errors', current + 1);
  }
  function getVersion() {
    return version;
  }
  function getErrors() {
    return errors;
  }
  
  return (
    <AppContext.Provider value={{incErrors, getVersion, getErrors}}>
      {children}
    </AppContext.Provider>
  )
}
