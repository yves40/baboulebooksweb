"use server"

import sqlHelper from '@/classes/sqlHelper';
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import AppError from '@/classes/customError';
import { checkEmail, checkPassword, hashPassword, validatePassword } from '@/libs/controls';

const modulename = "serverSession # ";
const Version = "Users.js Dec 18 2025, 1.09";
const DBExpirationDelay = 60;  // One hour expiration date for DBSession (msec )
const CookieExpirationDelay = 1 * 24 * 60 * 60; // One day expiration date for Cookie (sec)

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
        let conn = await sqlh.startTransactionRW();
        // Assign a default role to the new user
        const roleanonymous = await sqlh.Select('select role_id from babouledb.roles where role_name = ?', 'ROLE_ANONYMOUS', conn );
        const result = await sqlh.Insert(`insert into babouledb.users 
            (usr_email, usr_password, usr_firstname, usr_lastname, usr_created) 
            values ( ?, ?, ?, ?, now())`,  [mail, hashedPassword, firstname, lastname ], conn );
        console.log(`${modulename} User registered with id ${result.insertId}`);
        // Assign role
        if(roleanonymous.length > 0) {
            const { role_id } = roleanonymous[0];
            await sqlh.Insert(`insert into babouledb.users_roles (ur_userid, ur_roleid) values ( ?, ? )`, 
                [result.insertId, role_id], conn );
        }
        else {
            throw new AppError("Rôle par défaut introuvable, contactez l'administrateur");
        }
        sqlh.commitTransaction(conn);
        return { mail, password,hashedpassword: hashedPassword, firstname, lastname };
      }
    catch(error) {
        console.log(`${module} ${error}`);
        if(error instanceof AppError) {
            throw error;      // Send this application error to the caller
        }
        if(error.code === 'ER_DUP_ENTRY') {
            throw new AppError('Email déjà enregistré');
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
        let conn = await sqlh.startTransactionRW();
        let result = await sqlh.Select('select usr_id, usr_email, \
                    usr_password, usr_lastname, usr_firstname from babouledb.users \
                    where usr_email = ? ', email, conn);
        console.log(result);
        if(result.length > 0) {
            const { usr_id, usr_email, usr_password, usr_lastname, usr_firstname} = result[0];
            console.log(`Found ${usr_email}`);
            await validatePassword(password, usr_password);
            // Good credentials, update the lastlogin column
            await sqlh.Update('update babouledb.users set usr_lastlogin = now() where usr_id = ?', [usr_id], conn);
            revalidateTag("auth-session");  // gestion du cache NextJS
        }
        else {
            throw new AppError('Connexion rejetée'); // Unknown user
        }
        sqlh.commitTransaction(conn);
        return result[0];
    }
    catch(error) {
      if(error instanceof AppError) {        
        throw error;   
      }
      console.error(`Erreur sur le serveur: ${error.message}`);
      throw new Error('Erreur durant le login');
    }
}
// ------------------------------------------------------------------------
export async function createUserCookie(userid) {
    const cookieStore = await cookies();
    cookieStore.set('userid', userid.toString(), { 
        httpOnly: true, // No JS access
        secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
        path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
        maxAge: CookieExpirationDelay,   // One day persistence
        sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
    });
}
// ------------------------------------------------------------------------
export async function getUserCookie() {
    const cookieStore = await cookies();
    const userCookieId = cookieStore.get("userid")?.value;
    if (!userCookieId) {  // No cookie yet !
        return { success: false, cookie: undefined };
    }
    else {
        return { success: true, cookie: userCookieId };
    }
}
// ------------------------------------------------------------------------
export async function deleteUserCookie() {
    const cookieStore = await cookies();
    cookieStore.set('userid', "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",  // If prod, use HTTP for requests
        path: '/',
        maxAge: 0,  // maxAge set to 0 deletes the cookie
        sameSite: "strict"
    });
}

// -----------------------------------------------------------------------------------------
// Logout
// -----------------------------------------------------------------------------------------
export async function logout() {
    try { 
        revalidateTag("auth-session");  // gestion du cache NextJS
        return { success: true }
    }
    catch(error) {
        console.log(error);        
        throw error
    }
}
