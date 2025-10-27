"use strict";

import {login} from '../server/user/serverUser.js'
import Session from '@/classes/clientSession';

export default class User {

  #firstname = "";
  #lastname = "";
  #email = "";
  #password = "";
  #password2 = "";
  #id = 0;
  #created;
  #lastlogin;
  #sqlh = null;
  
  // ------------------------------------------------------------------------
  constructor() {
    this.Version = "user.js Oct 27 2025, 1.05";
    this.#created = new Date();
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
      sess.createDBSession(usr_id);
    }
    catch(error) {
      console.log(error);
    }
  }
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}