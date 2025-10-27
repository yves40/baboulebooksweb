"use strict";
"use client"

import { createDBSession, getSessionCookie } from "@/server/session/serverSession";

export default class Session {

  #id = 0;
  #created = new Date();
  #expired = new Date();
  #userid = 0;
  #CookieExpirationDelay = 1 * 24 * 60 * 60; // One day expiration date for Cookie (sec)
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "Session.js Oct 27 2025, 1.01";
  }
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  createDBSession(userid) {
        console.log(`Create a session with userID : ${userid}`);
        createDBSession(userid);
  }
  // ------------------------------------------------------------------------
  async getSessionInfo() {
    const check = getSessionCookie();
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