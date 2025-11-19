"use strict";

import {login, logout, register} from '../server/security/Users'
import Session from '@/classes/Session';
import AppError from './customError';

export default class User {

  #id = 0;
  #email = "";
  #password = "";
  #firstname = "";
  #lastname = "";
  #lastlogin;
  MINPASS = 8;
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "user.js Nov 19 2025, 1.12";
    this.#lastlogin = null;
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
    }
  }
  // ------------------------------------------------------------------------
  async register(formData) {
    // Registration is now handled in server/security/Users.js
    try {
      // Call the server method
      const { mail, password, firstname, lastname } = Object.fromEntries(formData);
      this.#email = mail;
      this.#password = password;
      this.#firstname = firstname;
      this.#lastname = lastname;
      return await register(formData);
    }
    catch(error) {
      throw error;   
    }
  }
  // ------------------------------------------------------------------------
  async logout() {
    logout(this.getId()); // The server method
  }
  // ------------------------------------------------------------------------
  getEmail() { return this.#email};
  getId() { return this.#id};
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}