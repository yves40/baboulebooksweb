"use client"

import { createContext, useContext, useState, useEffect } from "react";
import Session  from "@/classes/Session";
import User  from "@/classes/User";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  console.log(`AuthContext mounted`);

  const [session, setSession] = useState(new Session());
  const [user, setUser] = useState(new User());

  useEffect( () => {
    async function getSessionState() {
        const cookiestate = await session.getSessionCookie();
        session.setSessionState(cookiestate);
    }    
    getSessionState();
  }, []) // Called once

  return (
    <AuthContext.Provider value={{session, setSession, user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
export function getSession() { return useContext(AuthContext)}
