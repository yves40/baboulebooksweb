"use server"

import sqlHelper from '@/classes/sqlHelper';
import { cookies } from "next/headers";
import bcrypt from 'bcryptjs';
import { revalidateTag } from "next/cache";
import AppError from '@/classes/customError';

const modulename = "serverSession # ";
const Version = "SessionsUsers.js Nov 01 2025, 1.04";
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
    const { userName, email, password, confpassword } = Object.fromEntries(formData);
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;        

    try {
        if(typeof userName !== "string" || (userName.trim().length < 3)) { 
            throw new AppError("Pseudo too short, must have at least 3 characters");
        }
        const validEmail = emailregex.test(email);
        if(typeof email !== "string" ||  !validEmail) {
            throw new AppError("Invalid email");
        }
        if(typeof password !== "string" || password.trim().length < 6) {
            throw new AppError("password must have at least 6 characters");
        }
        if(password !== confpassword) {
            throw new AppError("password and confirm password must be the same");
        }
        /**
         * SQL code to check user
        
        const normalizedUserName = slugify(userName, {lower:true,strict:true});
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
          userName,
          normalizedUserName,
          email,
          password: hashedPassword
        })
        await newUser.save();
        console.log(`${modulename} saved user to DB : ${JSON.stringify(newUser)}`);
        return { success: true };
        */
      }
    catch(error) {
        console.log(`Error while registering ${error}`);
        if(error instanceof AppError) {
            throw error;      // Send this application error to the caller
        }
        throw new Error('An error occured while registering'); // Send a generic message for any non App error
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
            const isPasswordOK = await bcrypt.compare(password, usr_password);
            if(!isPasswordOK) {
                throw new AppError('Connexion rejetée'); // Bad password
            }
            // Good credentials
            return { usr_id: usr_id, usr_email: usr_email };
        }
        else {
            throw new AppError('Connexion rejetée'); // Unknown user
        }
        revalidateTag("auth-session");  // gestion du cache NextJS
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