"use server"

import sqlHelper from '@/classes/sqlHelper';
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

const modulename = "serverSession # ";
const Version = "serverSession.js Oct 27 2025, 1.01";
const DBExpirationDelay = 60;  // One hour expiration date for DBSession (msec )
const CookieExpirationDelay = 1 * 24 * 60 * 60; // One day expiration date for Cookie (sec)


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
  sqlh.startTransactionRW();
  const result = await sqlh.Insert(`insert into babouledb.sessions (ses_userid, ses_created, ses_expired) \
    values ( ?, now(), now() + INTERVAL ${DBExpirationDelay} MINUTE )`, [parseInt( userid)] );
  sqlh.commitTransaction;
  const {insertId} = result;
  return insertId;
}
// ------------------------------------------------------------------------
export async function createCookieSession(userid) {
  const cookieStore = await cookies();
  cookieStore.set('userId', userid.toString(), { 
      httpOnly: true, // No JS access
      secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
      path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
      maxAge: CookieExpirationDelay,   // One day persistence
      sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
  });
}
// ------------------------------------------------------------------------
export async function getSessionCookie() {
    const cookieStore = await cookies();
    const userCookieId = cookieStore.get("sessionId")?.value;
    if (!userCookieId) {  // No cookie yet !
        console.log(`${modulename} user KO : No sessionCookie`);      
        return { success: false, cookie: undefined };
    }
    else {
        console.log(`${modulename} user KO : No sessionCookie`);      
        return { success: true, cookie: userCookieId };
    }
}

