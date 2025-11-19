"use server"

import sqlHelper from '@/classes/sqlHelper';
import { cookies } from "next/headers";
import bcrypt, { hash } from 'bcryptjs';
import { revalidateTag } from "next/cache";
import AppError from '@/classes/customError';
import { checkEmail, checkPassword, hashPassword, validatePassword } from '@/libs/controls';

const modulename = "serverSession # ";
const Version = "SessionsUsers.js Nov 19 2025, 1.05";
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
  console.log(`********** create cookies ${userid}===${sessionid}`);
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
  console.log(`********** cookies created`);
  
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
// ------------------------------------------------------------------------
// U S E R S 
// ------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// Register
// -----------------------------------------------------------------------------------------
export async function register(formData) {
    const { mail, password, confpassword, firstname, lastname } = Object.fromEntries(formData);

    try {
        checkEmail(mail);
        checkPassword(password);
        if(password !== confpassword) {
            throw new AppError("Les mots de passe ne correspondent pas");
        }
        const hashedPassword = await hashPassword(password);
        // Now SQL Insert
        const sqlh = new sqlHelper();
        await sqlh.startTransactionRW();
        // Assign a default role to the new user
        const roleanonymous = await sqlh.Select('select role_id from babouledb.roles where role_name = ?', 'ROLE_ANONYMOUS');
        const result = await sqlh.Insert(`insert into babouledb.users 
            (usr_email, usr_password, usr_firstname, usr_lastname, usr_created) 
            values ( ?, ?, ?, ?, now())`,  [mail, hashedPassword, firstname, lastname ] );
        console.log(`${modulename} User registered with id ${result.insertId}`);
        // Assign role
        if(roleanonymous.length > 0) {
            const { role_id } = roleanonymous[0];
            await sqlh.Insert(`insert into babouledb.users_roles (ur_userid, ur_roleid) values ( ?, ? )`, 
                [result.insertId, role_id] );
        }
        else {
            throw new AppError("Rôle par défaut introuvable, contactez l'administrateur");
        }
        sqlh.commitTransaction;
        return { mail, password,hashedpassword: hashedPassword, firstname, lastname };
      }
    catch(error) {
        console.log(`${module} ${error}`);
        if(error instanceof AppError) {
            throw error;      // Send this application error to the caller
        }
        throw new Error('Erreur d\'enregistrement'); // Send a generic message for any non App error
    }
}
// -----------------------------------------------------------------------------------------
// Login
// -----------------------------------------------------------------------------------------
export async function login(email, password) {

    console.log(`Log as : ${email}/${password}`);
    try {
        const sqlh = new sqlHelper();
        let result = await sqlh.Select('select usr_id, usr_email, usr_password from babouledb.users \
                            where usr_email = ? ', email);
        console.log(result);
        if(result.length > 0) {
            const { usr_id, usr_email, usr_password} = result[0];
            console.log(`Found ${usr_email}`);
            await validatePassword(password, usr_password);
            // Good credentials
            return { usr_id: usr_id, usr_email: usr_email };
            revalidateTag("auth-session");  // gestion du cache NextJS
        }
        else {
            throw new AppError('Connexion rejetée'); // Unknown user
        }
    }
    catch(error) {
      if(error instanceof AppError) {        
        throw error;   
      }
      console.error(`Erreur sur le serveur: ${error.message}`);
      throw new Error('Erreur durant le login');
    }
}
// -----------------------------------------------------------------------------------------
// Logout
// -----------------------------------------------------------------------------------------
export async function logout() {
    try {
        // Shoot the DB session
        // TODO
        // Shoot the cookie
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
        // deleteSessionCookies();
        revalidateTag("auth-session");  // gestion du cache NextJS
        return { success: true }
    }
    catch(error) {
        console.log(error);
        
    }
}