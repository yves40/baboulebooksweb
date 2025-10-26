"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { SAsessionInfo } from "@/server/session/session";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  const [isAuthenticated, setIsAuthenticated] = useState( {
    loading: true,
    isConnected: false,
    userId: null,
    userName: null
  })

  useEffect( () => {
    async function fetchSession() {
      const session = await SAsessionInfo();
      if(session.success) {
        setIsAuthenticated({
          loading: false,
          isConnected: session.success,
          userName: session.userName,
          userId: session.userId
        })
      }
    }
    fetchSession();
  }, [])

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() { return useContext(AuthContext)}
