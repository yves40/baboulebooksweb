"use client"

import { createContext, useContext, useState, useEffect } from "react";
import Session  from "@/classes/clientSession";
import User  from "@/classes/clientUser";
import { createDBSession, createCookieSession, getSessionCookie } from "@/server/security/SessionsUsers";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  console.log(`AuthContext mounted`);

  const [session, setSession] = useState(new Session());
  const [user, setUser] = useState(new User());

  useEffect( () => {
    async function getSessionState() {
        const cookiestate = await getSessionCookie();
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
