"use client"

import { useRef } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getSession } from '@/app/context/authContext';

export default function page() {
  const email = useRef('');
  const password = useRef('');
  const submitButton = useRef('');
  const serverInfo = useRef('');
  const router = useRouter();

  const {user, session} = getSession();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formdataObj = Object.fromEntries(formData);
      submitButton.current.disabled = true;
      user.login(formdataObj.email, formdataObj.password);
      // Update the authorization context
      session.setSessionState(true);
      router.push('/');
      submitButton.current.disabled = false;
    }
    catch(error) {
      window.alert('Invalid connection credentials');
    }
  }

  return (
    <div className='body__container page__container background-slate-500'>
      <h1 className='mb-10 text-2xl'>Se connecter</h1>
      <div className='w-7/8 md:w-1/2 border rounded shadow-md background-slate-900 text-left mx-auto
          m-4 p-4'>
        <form onSubmit={handleSubmit}>
            <label className='form__label' htmlFor="userName">email</label>
            <input className='form__input' type="text" name="email" id="email" ref={email} placeholder='Your registered email'/>
            <label className='form__label' htmlFor="password">Password</label>
            <input className='form__input' type="password" name="password" id="password" ref={password} placeholder='Your password'/>
            <button className='w-full bg-blue-500 hover:bg-blue-800 
              text-white mt-6 rounded-lg border p-4' ref={submitButton}>
              Connexion
            </button>
        </form>
      </div>
      { session.isConnected() && 
      <>
        <p ref={serverInfo} className=' text-center my-4'>Status</p>
      </>
      }
    <Link href={"/register"} className=' mt-6 text-blue-500 underline'>Need an account ? Register</Link>
  </div>
)
}
