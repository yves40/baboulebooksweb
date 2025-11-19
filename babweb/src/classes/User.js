"use strict";
"use client"

import {login, logout} from '../server/security/Users'
import Session from '@/classes/Session';
import AppError from './customError';

export default class User {

  #email = "";
  #id = 0;
  #logged;
  #lastlogin;
  MINPASS = 8;
  
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
    }
  }
  // ------------------------------------------------------------------------
  async logout() {
    logout(); // The server method
  }
  // ------------------------------------------------------------------------
  checkEmail(email) {
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailregex.test(email);
    if(typeof email !== "string" ||  !validEmail) {
        throw new AppError("Invalid email");
    }
  }
  // ------------------------------------------------------------------------
  checkPassword(pass, conf) {
    if(typeof pass !== "string" ) {
        throw new AppError("Invalid Password");
    }
    if(typeof conf !== "string" ) {
        throw new AppError("Invalid Confirmation Password");
    }
    if(pass.length < this.MINPASS) {
        throw new AppError("Password too short");
    }
    if((conf.length < this.MINPASS)){
        throw new AppError("Confirmation Password too short");
    }
    if((conf.length > 0)  && (pass.length > 0) && (pass !== conf)) {
        throw new AppError("Passwords should match");
    }
  }
  // ------------------------------------------------------------------------
  getEmail() { return this.#email};
  getId() { return this.#id};
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}