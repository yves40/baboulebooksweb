"use client"

import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { register } from '@/server/security/Users';
import InputEmail from '@/components/InputEmail';
import InputPassword from '@/components/InputPassword';
import InputText from '@/components/InputText';

export default function page() {
        
    const module = "RegisterPage";
    console.log(`*** ${module} : render`);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');    
    const feedback = useRef('feedback');
    const submitButton = useRef();

    // useRef to store validity flags (avoid mutating state directly on each keystroke)
    const validInput = {
        email: false,
        password: false
    };
    const router = useRouter();    // To be used after succesful registration
    
    useEffect(() => {
        checkMandatoryFields();
    }, [email, password, confpassword]);

    
    function checkMandatoryFields() {
        feedback.current.textContent = '';
        feedback.current.hidden = true;
        try {
            if(!email) {
                validInput.email = false;
                throw new Error("Email valide SVP");
            }
            else {
                validInput.email = true;
            }
            if(!password) {
                validInput.password = false;
                throw new Error("Mot de passe obligatoire");
            } 
            else {
                validInput.password = true;
            }
            if(!confpassword) { 
                validInput.password = false;  
                throw new Error("Confirmation obligatoire");
            }
            else {
                validInput.password = true;
            }
            if(password !== confpassword) {
                validInput.password = false;  
                throw new Error("Les mots de passe ne correspondent pas");
            } 
            else {
                validInput.password = true;
            }
        } 
        catch (error) {
            console.log(`*** ${module} ${error.message}`);
            feedback.current.textContent = error.message;
            feedback.current.hidden = false;
            submitButton.current.disabled = true;
        } 
        finally {
            if(validInput.email && validInput.password) {
                submitButton.current.disabled = false;
                submitButton.current.className = "w-full bg-blue-800 text-white my-4 rounded-lg border p-2";
            }
            else {
                submitButton.current.disabled = true;
                submitButton.current.className = "w-full bg-blue-200 text-white my-4 rounded-lg border p-2";
            }
        }
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formdataObj = Object.fromEntries(formData);
        console.log(JSON.stringify(formdataObj));
        feedback.current.textContent = ""
        feedback.current.hidden = false;
        submitButton.current.disabled = true;   // No multiple server request when one is running
        try {
            const result = await register(formData);
            console.log(result);             
            submitButton.current.textContent = 'User saved ✅';
            let countdown = 3;
            feedback.current.textContent = `Redirecting ${countdown}...`;
            const interval = setInterval(() => {
                countdown -= 1;
                feedback.current.textContent = `Redirecting ${countdown}...`;
                if(countdown === 0) {
                clearInterval(interval);
                router.push(`/login`); // In case of success route to login page
                }
            }, 1000);        
        }
        catch(error) {
            submitButton.current.textContent = 'S\'enregister';
            submitButton.current.disabled = false;
            feedback.current.textContent = error.message;
        }
    }

    return (
        <div className='body__container page__container background-slate-500'>
            <h1 className='mb-4 text-2xl'>S'enregistrer</h1>
            <div className='w-7/8 
                    md:w-1/2 border rounded shadow-md background-slate-900 
                    text-left mx-auto m-2 py-2 px-4'>
                <form onSubmit={handleSubmit}>
                    <InputEmail componentid="mail" label="Email" parentHandler={setEmail} ></InputEmail>
                    <InputPassword componentid="password" label="Mot de passe" parentHandler={setPassword}></InputPassword>
                    <InputPassword componentid="confpassword" label="Confirmation" parentHandler={setConfpassword}></InputPassword>
                    <InputText componentid="lastname" label="Nom"  parentHandler={setLastname}></InputText>
                    <InputText componentid="firstname" label="Prénom" parentHandler={setFirstname}></InputText>
                    <button className="w-full bg-blue-200 hover:bg-blue-800
                         text-white my-4 rounded-lg border p-2"
                        ref={submitButton}>S'enregistrer
                    </button>
                </form>
                <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
            </div>
            <Link href={"/login"} className=' mt-4 text-gray-700 underline'>Vous avez un compte ? Connectez vous</Link>
        </div>
    )
}
