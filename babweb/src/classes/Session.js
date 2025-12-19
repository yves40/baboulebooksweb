"use strict";

import {createSessionCookie, getSessionCookie, createDBSession, closeDBSession } from "@/server/security/Sessions";
import Logger from "./logger";
export default class Session {
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "Session.js Dec 19 2025, 1.11";
    this.sessionid = 0;
    this.userid = 0;
    this.state = false;
    this.created = new Date();
    this.expired = new Date();
    this.Logger = new Logger();
  }
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  async createDBSession(userid) {
        this.Logger.info(`createDBSession with userID : ${userid}`);
        this.sessionid = await createDBSession(userid);
        return this.sessionid;
  }
  // ------------------------------------------------------------------------
  async checkDBSession() {
        this.Logger.info(`checkDBSession with sessionID : ${this.sessionid}`);
        const status = await checkDBSession(this.sessionid);
        return status;
  }
  // ------------------------------------------------------------------------
  async createSessionCookie(sessionid) {
        this.Logger.info(`createSessionCookie  sessionID : ${sessionid}`);
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
        Logger.error(`Session logout failed: ${error}`);       
      }    
  }
  // ------------------------------------------------------------------------
  setSessionId(id) { this.sessionid = id}
  setuserId(id) { this.userid = id}
  getSessionId() { return this.sessionid}
  setSessionState(state) { this.state = state}
  getSessionState() { return this.state}
  
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}