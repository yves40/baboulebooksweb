"use strict";
"use client"

import {login, logout} from '../server/security/SessionsUsers'
import Session from '@/classes/clientSession';
import AppError from './customError';

export default class User {

  #email = "";
  #id = 0;
  #logged;
  #lastlogin;
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "user.js Nov 01 2025, 1.11";
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
      throw error;   
      console.error(`Erreur sur le serveur: ${error.message}`);
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