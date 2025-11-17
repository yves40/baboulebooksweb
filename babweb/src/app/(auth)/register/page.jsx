"use client"

import React, { useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getSession } from '@/app/context/authContext';
import InputEmail from '@/components/InputEmail';
import InputPassword from '@/components/InputPassword';
import InputText from '@/components/InputText';

export default function page() {

    
    const module = "RegisterPage";
    const TIMEOUT = 500;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    // useRef to store validity flags (avoid mutating state directly on each keystroke)
    const validRef = useRef({
        email: false,
        password: false,
        confpassword: false
    });
    const debounceRef = useRef(null); // Debounce validation so checks run after the user stops typing (300ms)
    
    const serverInfo = useRef('');
    const submitButton = useRef();
    const router = useRouter();
    
    const {user, session} = getSession();
    console.log(`*** ${module} render`);

    function checkMandatoryFields() {
        serverInfo.current.textContent = '';
        try {
            if(!email) throw new Error("Email obligatoire");
            if(!password) throw new Error("Mot de passe obligatoire");
            if(!confpassword) throw new Error("Confirmation obligatoire");
            if(password !== confpassword) throw new Error("Les mots de passe ne correspondent pas");
        } 
        catch (error) {
            console.log(`*** ${module} ${error.message}`);
            serverInfo.current.textContent = error.message;
            // mark the specific field invalid
            validRef.current[id] = false;
        } finally {
            manageButton();
        }
    }

    function manageButton() {
        const ok = validRef.current.email && validRef.current.password && validRef.current.confpassword;
        if (submitButton.current) submitButton.current.disabled = !ok;
    }

    async function handleSubmit(e)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formdataObj = Object.fromEntries(formData);
        console.log(JSON.stringify(formdataObj));
        // serverInfo.current.textContent = ""
        // submitButton.current.disabled = true;   // No multiple server request when one is running
        // try {
        //     // const result = await register(new FormData(e.target));            
        //     submitButton.current.textContent = 'User saved ✅';
        //     let countdown = 3;
        //     serverInfo.current.textContent = `Redirecting ${countdown}...`;
        //     const interval = setInterval(() => {
        //         countdown -= 1;
        //         serverInfo.current.textContent = `Redirecting ${countdown}...`;
        //         if(countdown === 0) {
        //         clearInterval(interval);
        //         router.push(`/login`); // In case of success route to login page
        //         }
        //     }, 1000);        
        // }
        // catch(error) {
        //     submitButton.current.textContent = 'S\'enregister';
        //     submitButton.current.disabled = false;
        //     console.log(error);            
        //     serverInfo.current.textContent = error.message;
        // }
    }

    return (
        <div className='body__container page__container background-slate-500'>
            <h1 className='mb-4 text-2xl'>S'enregistrer</h1>
            <div className='w-7/8 
                    md:w-1/2 border rounded shadow-md background-slate-900 
                    text-left mx-auto m-2 py-2 px-4'>
                <form onSubmit={handleSubmit}>
                    <InputEmail componentname="mail" componentid="mail" label="Email" parentHandler={setEmail} ></InputEmail>
                    <InputPassword componentname="password" componentid="password" label="Mot de passe" parentHandler={setPassword}></InputPassword>
                    <InputPassword componentname="confpassword" componentid="confpassword" label="Confirmation" parentHandler={setConfpassword}></InputPassword>
                    <InputText componentname="lastname" componentid="lastname" label="Nom"  parentHandler={setLastname}></InputText>
                    <InputText componentname="firstname" componentid="firstname" label="Prénom" parentHandler={setFirstname}></InputText>
                    <button className='w-full bg-blue-500 hover:bg-blue-800 text-white 
                        my-4 rounded-lg border p-2'
                        ref={submitButton} disabled>S'enregistrer
                    </button>
                </form>
            </div>
            <p hidden ref={serverInfo} className=' text-center my-4 text-red-600'></p>
            <Link href={"/login"} className=' mt-4 text-blue-500 underline'>Vous avez un compte ? Connectez vous</Link>
        </div>
    )
}
