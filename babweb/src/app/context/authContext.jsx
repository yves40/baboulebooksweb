"use client"

import { createContext, useContext, useState, useEffect } from "react";
import Session  from "@/classes/clientSession";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  const [userIdentity, setUserIdentity] = useState( {
    isConnected: false,
    userId: null,
    userName: null
  })

  useEffect( () => {
    async function fetchSession() {
      const sess = new Session();
      const session = await sess.getSessionInfo();
      if(session.success) {
        setUserIdentity({
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
