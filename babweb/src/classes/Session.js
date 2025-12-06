"use strict";

import {createSessionCookie, getSessionCookie, createDBSession, closeDBSession } from "@/server/security/Sessions";
export default class Session {
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "Session.js Dec 06 2025, 1.10";
    this.sessionid = 0;
    this.userid = 0;
    this.state = false;
    this.created = new Date();
    this.expired = new Date();
  }
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  async createDBSession(userid) {
        console.log(`createDBSession with userID : ${userid}`);
        this.sessionid = await createDBSession(userid);
        return this.sessionid;
  }
  // ------------------------------------------------------------------------
  async createSessionCookie(sessionid) {
        console.log(`createSessionCookie  sessionID : ${sessionid}`);
        await createSessionCookie(sessionid);
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
  async logout() {
      try {
        await closeDBSession(this.getSessionId()); // server method
      }
      catch(error) {
        console.log(`Session logout failed: ${error}`);       
      }    
  }
  setSessionId(id) { this.sessionid = id}
  setuserId(id) { this.userid = id}
  getSessionId() { return this.sessionid}
  setSessionState(state) { this.state = state}
  getSessionState() { return this.state}
  
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