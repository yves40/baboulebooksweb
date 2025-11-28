"use client"

import { createContext, useContext, useReducer } from "react";
import Session  from "@/classes/Session";
import User  from "@/classes/User";

export const AuthContext = createContext();

export function AuthProvider({children}) {

  const version = "authContext Nov 26 2025, 1.20";
  const module = "AuthContext";
  const [user, dispatchUser] = useReducer(manageUser, null);
  const [session, dispatchSession] = useReducer(manageSession, null);

  function manageUser(prevUser, action) {
    switch(action.type) {
      case 'SET_USER':
        return action.payload;
      case 'CLEAR_USER':
        return new User();
    }
  }
  function manageSession(prevSession, action) {
    switch(action.type) {
      case 'SET_SESSION':
        return action.payload;
      case 'CLEAR_SESSION':
        return new Session();
    }
  }

  // ------------------------------------------------------------------------
  function setUser(newUser) {dispatchUser({type: 'SET_USER', payload: newUser});}
  function logoutUser() {dispatchUser({type: 'CLEAR_USER'});}
  function setSession(newSession) {dispatchSession({type: 'SET_SESSION', payload: newSession});}
  function logoutSession() {dispatchSession({type: 'CLEAR_SESSION'});}
  function getUser() {return user;}
  function getSession() { return session}
  function isUserLogged() {return (user != null && user.getId() != 0);}

  return (
    <AuthContext.Provider value={{session, user, 
                  setUser,
                  isUserLogged,
                  getUser,
                  logoutUser,
                  setSession,
                  getSession,
                  logoutSession
            }}>
      {children}
    </AuthContext.Provider>
  )
}
export function getAuthContext() { return useContext(AuthContext)}
