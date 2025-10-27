"use server"

import sqlHelper from '@/classes/sqlHelper';
import { cookies } from "next/headers";

const modulename = "serverSession # ";
const Version = "serverSession.js Oct 27 2025, 1.01";
const DBExpirationDelay = 60;  // One hour expiration date for DBSession (msec )


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
  sqlh.Insert(`insert into babouledb.sessions (ses_userid, ses_created, ses_expired) \
    values ( ?, now(), now() + INTERVAL ${DBExpirationDelay} MINUTE )`, [parseInt( userid)] );
  sqlh.commitTransaction;
}
// ------------------------------------------------------------------------
export async function setSessionCookie(userid) {
  
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

