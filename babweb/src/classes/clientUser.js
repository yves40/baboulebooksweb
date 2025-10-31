"use strict";
"use client"

import {login, logout} from '../server/security/SessionsUsers'
import Session from '@/classes/clientSession';

export default class User {

  #email = "";
  #id = 0;
  #logged;
  #lastlogin;
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "user.js Oct 31 2025, 1.10";
    this.#logged = new Date();
    this.#lastlogin = new Date();
  }  
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  async login(email, password) {
    try {
      const {usr_id, usr_email} = await login(email, password);
      this.#id = usr_id;
      this.#email = usr_email;
      // Create a new session
      const sess = new Session();
      const sessionId = await sess.createDBSession(usr_id);
      sess.createCookieSession(usr_id, sessionId);
    }
    catch(error) {
      console.log(error);
    }
  }
  // ------------------------------------------------------------------------
  async logout() {
    logout(); // The server method
  }
  // ------------------------------------------------------------------------
  getEmail() { return this.#email};
  getId() { return this.#id};
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}