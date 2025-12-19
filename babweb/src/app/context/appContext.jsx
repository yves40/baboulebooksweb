/*
  React context is commonly used to share global state like the current theme. 
  However, React context is not supported in Server Components.
  https://nextjs.org/docs/app/getting-started/server-and-client-components#context-providers
*/
"use client"

import { createContext, useEffect, useState } from "react";

export const AppContext =createContext();
export function AppProvider({children}) {
  
  const version = 'baboulebooks, Dec 19 2025 : 1.45';

  useEffect(() => {
  }, []);

  function getVersion() {
    return version;
  }
  return (
    <AppContext.Provider value={
        {
          getVersion, 
        }
      }>
      {children}
    </AppContext.Provider>
  )
}
