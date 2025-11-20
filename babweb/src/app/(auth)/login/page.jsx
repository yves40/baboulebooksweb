"use client"

import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getAuthContext } from '@/app/context/authContext';
import InputEmail from '@/components/InputEmail';
import InputPassword from '@/components/InputPassword'; 

export default function page() {

  const module = "LoginPage";
  console.log(`*** ${module} : render`);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const feedback = useRef('feedback');  
  const submitButton = useRef('');
  const router = useRouter();
  const {user, session, setSession, setUser} = getAuthContext();
  const validInput = {
        email: false,
        password: false
  };

  useEffect(() => {
    checkMandatoryFields();
  }, [email, password]);

  function checkMandatoryFields() {
    feedback.current.textContent = '';
    feedback.current.hidden = true;
    if(!email) {
        validInput.email = false;
    }
    else {
        validInput.email = true;
    }
    if(!password) {
        validInput.password = false;
    } 
    else {
        validInput.password = true;
    }
    if(validInput.email && validInput.password) {
        submitButton.current.disabled = false;
        submitButton.current.className = "w-full bg-blue-800 text-white my-4 rounded-lg border p-2";
    }
    else {
        submitButton.current.disabled = true;
        submitButton.current.className = "w-full bg-blue-200 text-white my-4 rounded-lg border p-2";
    }
  }



  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formdataObj = Object.fromEntries(formData);
      submitButton.current.disabled = true;
      const loggeduser = await user.login(formdataObj.mail, formdataObj.password);
      // user.setId(loggeduser.getId());
      // user.setEmail(loggeduser.getEmail());
      // user.setFirstName(loggeduser.getFirstName());
      // user.setLastName(loggeduser.getLastName()); 
      setUser(loggeduser);
      console.log(`${module} ${user.getEmail()} logged in successfully`);
      
      // Update the authorization context
      await session.setSessionState(true);
      router.push('/');
      submitButton.current.disabled = false;
    }
    catch(error) {
      feedback.current.textContent = `${error.message}`;
      feedback.current.hidden = false;
      submitButton.current.disabled = false;  
    }
  }

  return (
    <div className='body__container page__container background-slate-500'>
      <h1 className='mb-10 text-2xl'>Se connecter</h1>
      <div className='w-7/8 md:w-1/2 border rounded shadow-md background-slate-900 text-left mx-auto
          m-4 p-4'>
        <form onSubmit={handleSubmit}>
            <InputEmail componentid="mail" label="Email" placeholder="false" parentHandler={setEmail} ></InputEmail>
            <InputPassword componentid="password" label="Mot de passe" placeholder="false" parentHandler={setPassword}></InputPassword>
            <button className='w-full bg-blue-200 hover:bg-blue-800 
              text-white mt-6 rounded-lg border p-4' ref={submitButton}>
              Connexion
            </button>
        </form>
        <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
      </div>
    <Link href={"/register"} className=' mt-6 text-gray-700 underline'>Pas de compte ? Enregistrez vous</Link>
  </div>
)
}
