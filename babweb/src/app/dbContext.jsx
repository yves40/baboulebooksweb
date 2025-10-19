/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useContext, useState, useEffect } from "react";

export const dbContext =createContext();
console.log(`dbContext triggered`);

export function DbProvider({children}) {

  const [dbStatus, setDbStatus] = useState( {
    isConnected: false,
  })

  // useEffect( () => {
  //   console.log(`useEffect() in dbContext`);
  // }, []);

  return (
    <dbContext.Provider value={{dbStatus, setDbStatus}}>
      {children}
    </dbContext.Provider>
  )
}
