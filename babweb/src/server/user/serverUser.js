"use server"

import bcrypt from 'bcryptjs';
import sqlHelper from '@/classes/sqlHelper';

const Version = 'serverUser, Oct 27 2025 : 1.01';
const modulename = 'serverUser # ';

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
                throw new Error('Invalid credentials');
            }
            // Good credentials
            return { usr_id: usr_id, usr_email: usr_email };
            // console.log(`${modulename} search a session with userId : ${usr_id}`);
            // result = await sqlh.Select('select ses_id, ses_userid from babouledb.sessions\
            //                 where ses_userid = ? ', usr_id);
            // if(result.length > 0 ) {    // Session exists and is not expired
            //     console.log('session exists and is valid');
                
            // }
        }
        else {
            throw new Error('Invalid credentials');
        }
        // User authenticated. Create a session and a cookie or update an existing session
        // for this user ( in the DB )
        // let session;
        // const existingSession = await Session.findOne({
        //     userId: user._id,
        //     expiresAt: { $gt : new Date()} // Check the expire date of the existing session is not expired
        // })
        // // console.log(`${modulename} Existing session ${existingSession ? existingSession._id : 'New session created'}`);       
        // if(existingSession) {   // Update the existing session
        //     // console.log(`${modulename} Updating existing session in Mongo for user ${user.userName}`);            
        //     session = await Session.findOneAndUpdate({ 
        //         userId: user._id,
        //         expiresAt: new Date(Date.now() + DBExpirationDelay)
        //     });
        // }
        // else {
        //     // console.log(`${modulename} Creating a session in Mongo for user ${user.userName}`);            
        //     session = new Session( { 
        //         userId: user._id,
        //         expiresAt: new Date(Date.now() + DBExpirationDelay)
        //     })
        //     await session.save();   // Push to mongo
        // }
        // console.log(`${modulename} Set cookie for ${user.userName}`);            
        // const cookieStore = await cookies();
        // cookieStore.set('sessionId', session.userId.toString(), { 
        //     httpOnly: true, // No JS access
        //     secure: process.env.NODE_ENV === "production", // If prod, use HTTP for requests
        //     path: '/', // Use cookie for all APP pages. Could be restrained to sensitive pages
        //     maxAge: CookieExpirationDelay,   // One day persistence
        //     sameSite: "Lax" // To block CSRF attacks. Cookie is sent only to our site. Look at https://contentsquare.com/fr-fr/blog/samesite-cookie-attribute/
        // });
        revalidateTag("auth-session");  // gestion du cache NextJS
    }
    catch(error) {
        // console.log('Error while login');
        throw new Error(error.message);    
    }
}
// -----------------------------------------------------------------------------------------
// Logout
// -----------------------------------------------------------------------------------------
export async function logout() {
    const cookieStore = await cookies();
    const userId = cookieStore.get('sessionId')?.value;
    try {
        await Session.findOneAndDelete({ userId: userId });        // Shoot the DB session
        cookieStore.set('sessionId', "", {                         // Shoot the cookie
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",         // If prod, use HTTP for requests
            path: '/',
            maxAge: 0,  // maxAge set to 0 deletes the cookie
            sameSite: "strict"
        });
        revalidateTag("auth-session");  // gestion du cache NextJS
        return { success: true }
    }
    catch(error) {
        console.log(error);
        
    }
}