"use strict";

import {createCookieSession, getSessionCookie, createDBSession } from "@/server/security/Sessions";
export default class Session {

  #sessionid = 0;
  #userid = 0;
  #state = false;   // Not connected, if true connected
  #created = new Date();
  #expired = new Date();
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "Session.js Nov 19 2025, 1.06";
  }
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  async createDBSession(userid) {
        console.log(`createDBSession with userID : ${userid}`);
        // TODO get the session ID from the DB
        const sessionId = await createDBSession(userid);
        console.log('********************* Done');        
        return sessionId;
  }
  // ------------------------------------------------------------------------
  async createCookieSession(userid, sessionid) {
        console.log(`createCookieSession with userID : ${userid} and sessionID : ${sessionid}`);
        await createCookieSession(userid, sessionid);
        console.log('********************* Done');        
  } 
  // ------------------------------------------------------------------------
  async getSessionCookie() {
    const status = await getSessionCookie();
    if(status.success === true) {
        return status.cookie;
    }
    return null
  }
  // ------------------------------------------------------------------------
  isConnected() {
    return (this.#state === false ? false : true);
  }
  setSessionId(id) { this.#sessionid = id}
  getSessionId() { return this.#sessionid}
  setSessionState(state) { this.#state = state}
  getSessionState() { return this.#state}
  /**
     * Check session in DB
    await connectToDB();
    // Check the user session in the DB
    const session = await Session.findOne({ userId: userCookieId });
    if(!session || session.expiresAt < new Date()) { // Inexistent or expired session ?
        return { success: false };
        }
        // Check the user tied to this session
    const user = await User.findById(session.userId);
    if(!user) {
      console.log(`${modulename} user KO : DB user not found`);      
      return { success: false, userId: null };
    }
    else {
      return { success: true, userId: user._id.toString(), 
    userName: user.userName,
    NormalizedUserName: user.normalizedUserName
    };
  }
  */
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}