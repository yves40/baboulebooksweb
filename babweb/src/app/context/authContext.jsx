"use client"

import { createContext, useContext, useState, useEffect } from "react";
import Session  from "@/classes/clientSession";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  console.log(`AuthContext mounted`);

  const [userIdentity, setUserIdentity] = useState( {
    isConnected: false,
    userId: 0,
    userEmail: ''
  })

  useEffect( () => {
    async function fetchSession() {
      const sess = new Session();
      const session = await sess.getSessionInfo();
      if(session.success) {
        setUserIdentity({
          isConnected: session.success,
          userEmail: session.userEmail,
          userId: session.userId
        })
      }
      else {
        setUserIdentity({
          isConnected: false,
          userEmail: '',
          userId: 0
        })
      }
    }
    fetchSession();
  }, []) // Called once

  return (
    <AuthContext.Provider value={{userIdentity, setUserIdentity}}>
      {children}
    </AuthContext.Provider>
  )
}
export function getUserIdentity() { return useContext(AuthContext)}
