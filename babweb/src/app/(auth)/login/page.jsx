"use client"

import { useRef } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import  User  from "@/classes/clientUser";

export default function page() {
  const {userIdentity} = useContext(AuthContext);;
  const email = useRef('');
  const password = useRef('');
  const submitButton = useRef('');
  const serverInfo = useRef('');
  const router = useRouter();

  async function handleSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formdataObj = Object.fromEntries(formData);
      // submitButton.current.disabled = true;
      const user = new User();
      user.login(formdataObj.email, formdataObj.password);
      // serverInfo.current.textContent = "";
      // try {
      //   const result = await login(new FormData(e.target));
      //   if(result.success) {
      //     setIsAuthenticated({ loading: false, isConnected: true, userId: result.userId, userName: result.userName});
      //     router.push('/');
      //   }
      // }
      // catch(error) {
      //   console.error(error.message);
      //   submitButton.current.disabled = false;
      //   serverInfo.current.textContent = error.message;
      // }
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
      { userIdentity.isConnected && 
      <>
        <p ref={serverInfo} className=' text-center my-4'>Status</p>
      </>
      }
    <Link href={"/register"} className=' mt-6 text-blue-500 underline'>Need an account ? Register</Link>
  </div>
)
}
