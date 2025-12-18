"use strict";

import mysqlPromise from "mysql2/promise.js";
import dotenv from 'dotenv';
import AppError from "./customError";

// TODO study singleton, check instance

export default class sqlHelper {

  #dbhost = process.env.DBHOST;
  #dbport = process.env.DBPORT;
  #dbname = process.env.DBNAME;
  #dbuser = process.env.DBUSER;
  #dbpass = process.env.DBPASS;
  
  constructor() {
    this.Version = "sqlHelper.js Dec 18 2025, 1.59";

    dotenv.config({ quiet: true });
    this.#dbhost = process.env.DBHOST;
    this.#dbport = process.env.DBPORT;
    this.#dbname = process.env.DBNAME;
    this.#dbuser = process.env.DBUSER;
    this.#dbpass = process.env.DBPASS;

    (async () => {
      this.pool = this.#createPool();
    })();
  }
  // ------------------------------------------------------------------------
  //      P U B L I C 
  // ------------------------------------------------------------------------
  getVersion() {
    return this.Version;
  }
  // ------------------------------------------------------------------------
  Select(query, params = null, conn) {
    if(conn === null || conn === undefined ) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ rows ] = await conn.query(query, params);
          resolve(rows) ;
        }
        catch(error) {
          reject(error);
        }
      })();
    });
  }
  // ------------------------------------------------------------------------
  Insert(sql, params = null, conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ result, fields ] = await conn.execute(sql, params);
          resolve(result) ;
        }
        catch(error) {
          console.log(`INSERT ERROR ${error}`);
          reject(error);
        }
      })();
    });
  }
  // ------------------------------------------------------------------------
  Delete(sql, params = null, conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ result, fields ] = await conn.execute(sql, params);
          resolve(result) ;
        }
        catch(error) {
          console.log(`DELETE ERROR ${error}`);
          reject(error);
        }
      })();
    });
  }
  // ------------------------------------------------------------------------
  Update(sql, params = null, conn ) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
          const [ result, fields ] = await conn.execute(sql, params);
          resolve(result) ;
        }
        catch(error) {
          console.log(`UPDATE ERROR ${error}`);
          reject(error);
        }
      })();
    });
  }
  
  
  // ------------------------------------------------------------------------
  startTransactionRW() {
    return new Promise((resolve, reject) => {
      (async () => {
        let theconnection = null;
        try {
          theconnection = await this.pool.getConnection();
          if(theconnection == null) {
            throw new AppError("SQLHelper startRW cannot get a connection");
          }
          await theconnection.execute('set transaction read write');
          resolve(theconnection);
        }
        catch(err) {
          if(theconnection != null) {
            this.pool.releaseConnection(theconnection);
          }
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  startTransactionRO() {
    return new Promise((resolve, reject) => {
      (async () => {
        let theconnection = null;
        try {
          theconnection = await this.pool.getConnection();
          if(theconnection == null) {
            throw new AppError("SQLHelper startRO cannot get a connection");
          }
          await theconnection.execute('set transaction read only');
          resolve(theconnection);
        }
        catch(err) {
          if(theconnection != null) {
            this.pool.releaseConnection(theconnection);
          }
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  rollbackTransaction(conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
              await conn.execute('rollback');
              this.pool.releaseConnection(conn);
              resolve(true);
        }
        catch(err) {
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  commitTransaction(conn) {
    if(conn == null) {
      throw new AppError("SQLHelper statement requires a valid connection");
    }
    return new Promise((resolve, reject) => {
      (async () => {
        try {
              await conn.execute('commit');
              this.pool.releaseConnection(conn);
              resolve(true);
        }
        catch(err) {
          reject(`${err.message}`);
        } 
      })();
    });
  }
  // ------------------------------------------------------------------------
  //      P R I V A T E 
  // ------------------------------------------------------------------------
  #createPool() {
      try {
        const pool = mysqlPromise.createPool({
            host: this.#dbhost, 
            port: this.#dbport,
            database: this.#dbname,
            user: this.#dbuser,
            password: this.#dbpass,
            waitForConnections: true,
            connectionLimit: 10,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            charset: 'utf8mb4',
            keepAliveInitialDelay: 0,
          });
          return(pool);
      }
      catch( error ) {
        throw new Error(`Got a problem with connection pooling ${error}`);
      }
  }
}