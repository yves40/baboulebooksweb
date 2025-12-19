"use client"

import { useEffect, useRef, useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getAuthContext } from '@/app/context/authContext';
import { AppContext } from "@/app/context/appContext";
import InputEmail from '@/components/InputEmail';
import InputPassword from '@/components/InputPassword'; 
import User from "@/classes/User";
import Session from "@/classes/Session";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/menuProperties";
import Logger from "@/classes/logger";

export default function page() {

  const module = "LoginPage";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const feedback = useRef('feedback');  
  const submitButton = useRef('');
  const router = useRouter();
  const validInput = {
    email: false,
    password: false
  };

  // Authentication context access
  const {setUser, setSession} = getAuthContext();
  const dispatch = useDispatch();
  const { refreshNavbar } =  AppContext;
  const logger = new Logger();

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
        submitButton.current.className = "w-[180px] bg-blue-800 text-white my-4 rounded-lg border p-2";
    }
    else {
        submitButton.current.disabled = true;
        submitButton.current.className = "w-[180px] bg-blue-200 text-white my-4 rounded-lg border p-2";
    }
  }



  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const formdataObj = Object.fromEntries(formData);
      submitButton.current.disabled = true;
      // New user
      let user = new User();
      const loggeduser = await user.login(formdataObj.mail, formdataObj.password);
      // Create a new session
      let session = new Session();
      const sessionid = await session.createDBSession(loggeduser.getId());
      session.setSessionState(true);
      session.setSessionId(sessionid);
      session.setuserId(loggeduser.getId());      
      // Create cookies for user and session
      await session.createSessionCookie(sessionid);
      await user.createUserCookie(loggeduser.getId());
      // Update the authorization context
      setUser(loggeduser);
      setSession(session);
      logger.info(`${module} - Dispatching loginUser action to redux store`);
      const dispatchObj =  dispatch(loginUser({useremail: loggeduser.getEmail()}));
      logger.info(`Result of the dispatch : ${JSON.stringify(dispatchObj)}`);
      
      // refreshNavbar();
      // Redirect to home page
      submitButton.current.disabled = false;
      //

      router.push('/');
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
            <div className="text-center">
              <button className='w-[180px] bg-blue-200 hover:bg-blue-800 
                text-white mt-6 rounded-lg border p-4' ref={submitButton}>
                Connexion
              </button>
            </div>
        </form>
        <p ref={feedback} hidden className='mb-2 text-red-600'>Message</p>
      </div>
      <Link href={"/register"} className=' mt-6 text-gray-700 underline'>Pas de compte ? Enregistrez vous</Link>
    </div>
  )
}
