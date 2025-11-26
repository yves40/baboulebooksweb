"use client"

import { createContext, useContext, useState, useEffect, useRef } from "react";
import Session  from "@/classes/Session";
import User  from "@/classes/User";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  const version = "authContext: 1.17";
  const module = "AuthContext";
  const [session, setSession] = useState(new Session());
  const [user, setUser] = useState(new User());
  
  // ------------------------------------------------------------------------
  function getUser() {
    return user;
  }
  function getSession() {
    return session;
  }
  // ------------------------------------------------------------------------
  useEffect( () => {
    async function getSessionState() {
      const cookiestate = await session.getSessionCookie();
      session.setSessionState(cookiestate);
    }    
    getSessionState();
  }, []);

  return (
    <AuthContext.Provider value={{session, user, setSession, setUser}}>
      {children}
    </AuthContext.Provider>
  )
}
export function getAuthContext() { return useContext(AuthContext)}
