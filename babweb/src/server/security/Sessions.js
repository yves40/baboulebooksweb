"use server"

import sqlHelper from '@/classes/sqlHelper';
import { cookies } from "next/headers";

const modulename = "serverSession # ";
const Version = "Sessions.js Nov 19 2025, 1.07";
const DBExpirationDelay = 60;  // One hour expiration date for DBSession (msec )
const CookieExpirationDelay = 1 * 24 * 60 * 60; // One day expiration date for Cookie (sec)


// ------------------------------------------------------------------------
// S E S S I O N S
// ------------------------------------------------------------------------
export async function isPrivatePage(pathname) {

    console.log(`${modulename} check ${pathname} privacy`);
    
    const privateSegments = [ 
        "/dashboard", 
        "/settings/profile",
        "/secret",
        "/internals",
        "/signout"];   // Protected paths

    privateSegments.map(path => {
        console.log(`${modulename} will check ${path} privacy`)
    });
    return privateSegments.some(segment => pathname === segment || 
        pathname.startsWith(segment + "/")); // Waouh !!!
}
// ------------------------------------------------------------------------
export async function createDBSession(userid) {
  const sqlh = new sqlHelper();
  await sqlh.startTransactionRW();
  const result = await sqlh.Insert(`insert into babouledb.sessions (ses_userid, ses_created, ses_expired) \
    values ( ?, now(), now() + INTERVAL ${DBExpirationDelay} MINUTE )`, [parseInt( userid)] );
  sqlh.commitTransaction;
  const {insertId} = result;
  return insertId;
}
  // ------------------------------------------------------------------------
  export async function createCookieSession(userid, sessionid) {
    const cookieStore = await cookies();
    cookieStore.set('userid', userid.toString(), { 
        httpOnly: true, // No JS access
        secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
        path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
        maxAge: CookieExpirationDelay,   // One day persistence
        sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
    });
    cookieStore.set('sessionid', sessionid.toString(), { 
        httpOnly: true, // No JS access
        secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
        path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
        maxAge: CookieExpirationDelay,   // One day persistence
        sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
    });  
  }
  // ------------------------------------------------------------------------
  export async function deleteSessionCookies() {
    const cookieStore = await cookies();
    cookieStore.set('sessionid', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // If prod, use HTTP for requests
        path: '/',
        maxAge: 0,  // maxAge set to 0 deletes the cookie
        sameSite: "strict"
    });
    cookieStore.set('userid', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // If prod, use HTTP for requests
        path: '/',
        maxAge: 0,  // maxAge set to 0 deletes the cookie
        sameSite: "strict"
    });
  }
  // ------------------------------------------------------------------------
  export async function getSessionCookie() {
      const cookieStore = await cookies();
      const userCookieId = cookieStore.get("sessionid")?.value;
      if (!userCookieId) {  // No cookie yet !
          console.log(`${modulename} user KO : No sessionCookie`);      
          return { success: false, cookie: undefined };
      }
      else {
          console.log(`${modulename} user OK : sessionCookie`);      
          return { success: true, cookie: userCookieId };
      }
  }

