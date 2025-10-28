"use strict";
"use client"

import { createDBSession, createCookieSession, getSessionCookie } from "@/server/session/serverSession";

export default class Session {

  #id = 0;
  #created = new Date();
  #expired = new Date();
  #userid = 0;
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "Session.js Oct 28 2025, 1.02";
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
  async createCookieSession(userid, sessionId) {
        console.log(`Cookie session with userID : ${userid}`);
        createCookieSession(userid, sessionId);
  }
  // ------------------------------------------------------------------------
  async getSessionInfo() {
    const check = await getSessionCookie();
    console.log('*****************' + JSON.stringify(check));
    return check;
  }
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