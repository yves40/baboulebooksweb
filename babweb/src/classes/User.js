"use strict";

import {login, logout, register, createUserCookie} from '../server/security/Users'
import Session from '@/classes/Session';
import AppError from './customError';

export default class User {

  id = 0;
  email= "";
  firstname = "";
  lastname = "";
  MINPASS = 8;
  
  // ------------------------------------------------------------------------
  constructor(id=0, email="", fname="", lname="", ) {
    this.Version = "user.js Nov 27 2025, 1.15";
    this.id = id;
    this.email= email;
    this.firstname = fname;
    this.lastname = lname;
  }  
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  async login(email, password) {
    try {
      const user = await login(email, password); // server method
      const { usr_id, usr_email, usr_lastname, usr_firstname } = user;
      this.id = usr_id;
      this.email= usr_email;  
      this.firstname =  usr_firstname;
      this.lastname =  usr_lastname;
      return this
    }
    catch(error) {
      throw error;   
    }
  }
  // ------------------------------------------------------------------------
  async register(formData) {
    try {
      const { mail, password, firstname, lastname } = Object.fromEntries(formData);
      this.email= mail;
      this.firstname = firstname;
      this.lastname = lastname;
      return await register(formData); // server method
    }
    catch(error) {
      throw error;   
    }
  }
  // ------------------------------------------------------------------------
  async logout() {
    try {
      await logout(); // server method, just delete cookies
      this.id = 0;
      this.email= "";
      this.firstname = "";
      this.lastname = "";
    }
    catch(error) {
      console.log(`User logout failed: ${error}`);       
    }
  }
  // ------------------------------------------------------------------------
  async createUserCookie(userid) {
        await createUserCookie(userid);
  } 
  // ------------------------------------------------------------------------
  getId() { return this.id};
  getEmail() { return this.email};
  getFirstName() { return this.firstname};
  getLastName() { return this.lastname}
  setId(id) { this.id = id};
  setEmail(email) { this.email= email};
  setFirstName(fname) { this.firstname = fname};
  setLastName(lname) { this.lastname = lname};
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
}