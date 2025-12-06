"use client"

import { createContext, useContext, useEffect, useReducer } from "react";
import Session  from "@/classes/Session";
import User  from "@/classes/User";


// Check later why it's breaking the server !!!!!!!!!!!!!!!!!!!!!!!
// import Logger from "@/classes/logger";
// const log = new Logger("AuthContext");
// log.info(`Initializing ${module} - ${version}`);

export const AuthContext = createContext();

export function AuthProvider({children}) {
  
  const version = "authContext Dec 06 2025, 1.30";
  const module = "AuthContext";  
  const [user, dispatchUser] = useReducer(manageUser,null);
  const [session, dispatchSession] = useReducer(manageSession, null);
  
  useEffect(() => { 
    const readuser = JSON.parse(sessionStorage.getItem("currentUser"));
    const readsession = JSON.parse(sessionStorage.getItem("currentSession"));
    if(readuser) {
      dispatchUser({type: 'SET_USER', payload: readuser});
    }
    if(readsession) {
      dispatchSession({type: 'SET_SESSION', payload: readsession});
    }
  }, []); // One call at component mount only

  // ------------------------------------------------------------------------
  function manageUser(prevUser, action) {
    // console.log(`${module} manageUser called with action ${action.type}`);
    switch(action.type) {
      case 'SET_USER':
        const u = new User();
        u.setId(action.payload.id);
        u.setEmail(action.payload.email);
        u.setFirstName(action.payload.firstname);
        u.setLastName(action.payload.lastname); 
        sessionStorage.setItem("currentUser", JSON.stringify(u))
        return u;
      case 'CLEAR_USER':
        sessionStorage.removeItem("currentUser");
        return new User();
    }
  }
  // ------------------------------------------------------------------------
  function manageSession(prevSession, action) {
    // console.log(`${module} manageSession called with action ${action.type}`);
    switch(action.type) {
      case 'SET_SESSION':
        const s = new Session();
        s.setSessionId(action.payload.sessionid);
        s.setuserId(action.payload.userid);
        s.setSessionState(action.payload.state);
        sessionStorage.setItem("currentSession", JSON.stringify(s))
        return s;
      case 'CLEAR_SESSION':
        sessionStorage.removeItem("currentSession");
        return new Session();
    }
  }


  // ------------------------------------------------------------------------
  function setUser(newUser) {dispatchUser({type: 'SET_USER', payload: newUser});}
  function setSession(newSession) {dispatchSession({type: 'SET_SESSION', payload: newSession});}
  function logoutUser() {dispatchUser({type: 'CLEAR_USER'});}
  function closeSession() {dispatchSession({type: 'CLEAR_SESSION'});}
  function getUser() {return user;}
  function getSession() {  return session;}
  function isUserLogged() {
    const readuser = JSON.parse(sessionStorage.getItem("currentUser"));
    if(readuser && readuser.id && readuser.id > 0) {
      // dispatchUser({type: 'SET_USER', payload: readuser})
      return true;
    }
    else { 
      return false; 
    }
  }

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
