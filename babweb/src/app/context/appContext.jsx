/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useEffect, useState } from "react";

export const AppContext =createContext();

export function AppProvider({children}) {
  
  const version = 'baboulebooks :Nov 11 2025 : 1.30';
  const [ errors404, setErrors404 ] = useState(0);
  const [ errors, setErrors ] = useState(0);

  console.log(`AppContext mounted`);

  useEffect(() => {
    if(window.localStorage.getItem('errors404') == null) {
      window.localStorage.setItem('errors404', 0);
    }
    if(window.localStorage.getItem('errors') == null) {
      window.localStorage.setItem('errors', 0);
    }
  }, []);
  

  function incErrors404() {
    const current =parseInt(window.localStorage.getItem('errors404')) ;
    setErrors404(current + 1);
    window.localStorage.setItem('errors404', current + 1);
  }
  function incErrors() {
    const current =parseInt(window.localStorage.getItem('errors')) ;
    setErrors404(current + 1);
    window.localStorage.setItem('errors', current + 1);
  }
  function getVersion() {
    return version;
  }
  function getErrors404() {
    return errors404;
  }
  function getErrors() {
    return errors;
  }
  
  return (
    <AppContext.Provider value={
        {incErrors404, 
          incErrors, 
          getVersion, 
          getErrors404, 
          getErrors
        }
      }>
      {children}
    </AppContext.Provider>
  )
}
