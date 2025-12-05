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
  
  const version = "authContext Dec 05 2025, 1.28";
  const module = "AuthContext";  
  const [user, dispatchUser] = useReducer(manageUser,null);
  const [session, dispatchSession] = useReducer(manageSession, null);
  
  useEffect(() => { 
    const readuser = JSON.parse(sessionStorage.getItem("currentUser"));
    const readsession = JSON.parse(sessionStorage.getItem("currentSession"));
    if(readuser.id === 0) {
      dispatchUser({type: 'INIT_USER'});
    }
    else {
      dispatchUser({type: 'SET_USER', payload: readuser});
    }
    if(readsession.id === 0) {
      dispatchSession({type: 'INIT_SESSION'});
    }
    else {
      dispatchSession({type: 'SET_SESSION', payload: readsession});
    }
  }, []); // One call at component mount only
  
  
  // console.log(`${module} Mounted - version: ${version}`);
  // console.log(`${module} user object: ${user? JSON.stringify(user) : 'No user'}`);
  // ------------------------------------------------------------------------
  function manageUser(prevUser, action) {
    // console.log(`${module} manageUser called with action ${action.type}`);
    switch(action.type) {
      case 'INIT_USER':
        sessionStorage.setItem("currentUser", JSON.stringify(new User()));
        return new User();
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
      case 'INIT_SESSION':
        sessionStorage.setItem("currentSession", JSON.stringify(new Session()));
        return new Session();
      case 'SET_SESSION':
        const s = new Session();
        s.setSessionId(action.payload.id);
        s.setuserId(action.payload.userid);
        s.setSessionState(action.payload.state);
        sessionStorage.setItem("currentSession", JSON.stringify(action.payload))
        return action.payload;
      case 'CLEAR_SESSION':
        sessionStorage.removeItem("currentSession");
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
  function isUserLogged() {return (user ? user.getId(): 0);}

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
