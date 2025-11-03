"use client"

import React, { useRef, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getSession } from '@/app/context/authContext';

export default function page() {

    console.log('*** render');
    

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfpassword] = useState('');
    const [valid, setValid] = useState({
        email: false,
        password: false,
        confpassword: false
    })
    const serverInfo = useRef('');
    const submitButton = useRef();
    const router = useRouter();
    
    const {user, session} = getSession();

    function checkMandatoryFields(e) {
        try {
            switch(e.target.id) {
                case 'email':
                        valid.email = false;
                        user.checkEmail(e.target.value);
                        setEmail(e.target.value);
                        serverInfo.current.textContent = '';
                        valid.email = true;
                        break;
                case 'password':
                        valid.password = false;
                        user.checkPassword(e.target.value, confpassword);
                        setPassword(e.target.value);
                        serverInfo.current.textContent = '';
                        valid.password = true;
                        break;
                case 'confpassword':
                        valid.confpassword = false;
                        user.checkPassword(password, e.target.value);
                        setConfpassword(e.target.value);
                        serverInfo.current.textContent = '';
                        valid.confpassword = true;
                        break;
            }
            manageButton();
        }
        catch(error) {
            console.log('*** ' + error.message);
            manageButton();
            serverInfo.current.textContent = error.message;
        }
    }

    function manageButton() {
        console.log(valid);
        if(valid.email && valid.password && valid.confpassword) {
            submitButton.current.disabled = false;
        }
        else {
            submitButton.current.disabled = true;
        }
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
                    <label className='form__label' htmlFor="email">E-mail *</label>
                    <input onChange={(checkMandatoryFields)} className='form__input' type="text" name="email" id="email" placeholder='Your contact email'/>
                    <label className='form__label' htmlFor="password">Password *</label>
                    <input onChange={checkMandatoryFields} className='form__input' type="password" name="password" id="password" placeholder='Your password'/>
                    <label className='form__label' htmlFor="confpassword">Confirm password *</label>
                    <input onChange={checkMandatoryFields} className='form__input' type="password" name="confpassword" id="confpassword" placeholder='Confirrm password'/>
                    <label className='form__label' htmlFor="lastname">Nom</label>
                    <input className='form__input' type="text" name="lastname" id="lastname" placeholder='Nom'/>
                    <label className='form__label' htmlFor="firstname">Prénom</label>
                    <input className='form__input' type="text" name="firstname" id="firstname" placeholder='Prénom'/>
                    <button className='w-full bg-blue-500 hover:bg-blue-800 text-white 
                        mt-4 rounded-lg border p-2'
                        ref={submitButton} >S'enregistrer
                    </button>
                </form>
            </div>
            <p ref={serverInfo} className=' text-center my-4'></p>
            <Link href={"/login"} className=' mt-4 text-blue-500 underline'>Vous avez un compte ? Connectez vous</Link>
        </div>
    )
}
