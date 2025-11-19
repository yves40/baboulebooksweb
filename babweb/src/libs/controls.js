
import AppError from '@/classes/customError';
import bcrypt, { hash } from 'bcryptjs';

function containsUppercase(str) {
    return /[A-Z]/.test(str);
}
function containsNumber(str) {
    return /[0-9]/.test(str);
}

/**
 * 
 * @param {*} email To be checked
 * Throws an exception if invalid
 */
function checkEmail(email) {
    const emailregex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validEmail = emailregex.test(email);
    if(typeof email !== "string" ||  !validEmail) {
        throw new AppError("Entrez un email SVP");
    }
}
/**
 * 
 * @param {*} password The password string to be checked
 * Throws an exception if invalid
 */
// Some rules for password validation
function checkPassword(password) {
    if(typeof password !== "string" || password.length < 8) {
        throw new AppError("Minimum 8 caractères et une majuscule");
    }
    if(!containsUppercase(password)) {
        throw new AppError("Minimum une majuscule");
    }
    if(!containsNumber(password)) {
        throw new AppError("Minimum 1 chiffre");
    }
}
/**
 * 
 * @param {*} password which hash will be verified
 * @param {*} dbhashedPassword The DB hashed password to compare with
 * Throws an exception if invalid
 */
async function validatePassword(password, dbhashedPassword) {
    const isPasswordOK = await bcrypt.compare(password, dbhashedPassword);
    if(!isPasswordOK) {
        throw new AppError('Connexion rejetée'); // Bad password
    }    
}
/**
 * 
 * @param {*} password to be hashed
 * @returns the hashed password
 */
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);   
    return hashedPassword;
}

export { checkEmail, checkPassword, hashPassword, validatePassword };
