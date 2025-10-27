"use client"

import { createContext, useContext, useState, useEffect } from "react";
import { SAsessionInfo } from "@/server/session/session";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  const [userIdentity, setUserIdentity] = useState( {
    isConnected: false,
    userId: null,
    userName: null
  })

  useEffect( () => {
    async function fetchSession() {
      const session = await SAsessionInfo();
      if(session.success) {
        setsetUserIdentity({
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
    <AuthContext.Provider value={{userIdentity, setUserIdentity}}>
      {children}
    </AuthContext.Provider>
  )
}
export function getUserIdentity() { return useContext(AuthContext)}
