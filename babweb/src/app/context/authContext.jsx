"use client"

import { createContext, useContext, useReducer } from "react";
import Session  from "@/classes/Session";
import User  from "@/classes/User";

// Check later why it's breaking the server !!!!!!!!!!!!!!!!!!!!!!!
// import Logger from "@/classes/logger";
// const log = new Logger("AuthContext");
// log.info(`Initializing ${module} - ${version}`);

export const AuthContext = createContext();

export function AuthProvider({children}) {

  const version = "authContext Nov 29 2025, 1.24";
  const module = "AuthContext";
  const getInitialUserState = () => {
    const currentUser = sessionStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null
  }
  const getInitialSessionState = () => {
    const currentUser = sessionStorage.getItem("currentSession");
    return currentUser ? JSON.parse(currentUser) : null
  }

  const [user, dispatchUser] = useReducer(manageUser, getInitialUserState());
  const [session, dispatchSession] = useReducer(manageSession, getInitialSessionState());
  
  console.log(`${module} Mounted - version: ${version}`);
  console.log(`${module} user object: ${user? JSON.stringify(user) : 'No user'}`);
  
  function manageUser(prevUser, action) {
    console.log(`${module} manageUser called with action ${action.type}`);
    switch(action.type) {
      case 'SET_USER':
        sessionStorage.setItem("currentUser", JSON.stringify(action.payload))
        return action.payload;
      case 'CLEAR_USER':
        return new User();
    }
  }
  function manageSession(prevSession, action) {
    console.log(`${module} manageSession called with action ${action.type}`);
    switch(action.type) {
      case 'SET_SESSION':
        sessionStorage.setItem("currentSession", JSON.stringify(action.payload))
        return action.payload;
      case 'CLEAR_SESSION':
        return new Session();
    }
  }


  // ------------------------------------------------------------------------
  function setUser(newUser) {dispatchUser({type: 'SET_USER', payload: newUser});}
  function logoutUser() {dispatchUser({type: 'CLEAR_USER'});}
  function setSession(newSession) {dispatchSession({type: 'SET_SESSION', payload: newSession});}
  function closeSession() {dispatchSession({type: 'CLEAR_SESSION'});}
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
                  closeSession
            }}>
      {children}
    </AuthContext.Provider>
  )
}
export function getAuthContext() { return useContext(AuthContext)}
