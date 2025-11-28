"use client"

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getAuthContext } from '@/app/context/authContext';
import { deleteSessionCookie } from '@/server/security/Sessions';
import { deleteUserCookie } from '@/server/security/Users';
import { closeDBSession } from '@/server/security/Sessions';

export default function page() {
  
  const {getUser, logoutUser, closeSession, getSession} = getAuthContext();
  const router = useRouter(); 
  
  async function handleLogout(e) {
    e.preventDefault();
    console.log(`Log out for : ${getUser().getEmail()}`);
    // AuthContext update
    await logoutUser();
    await closeSession();
    // DB and cookies update
    await closeDBSession(getSession().getSessionId());
    await deleteSessionCookie();
    await deleteUserCookie();
    router.push('/');
  }    

  return (
    <div className='body__container page__container background-slate-500'>
      <h1 className='mb-10 text-2xl'>Déconnexion</h1>
      <div className='w-7/8 md:w-1/2 border rounded shadow-md background-slate-900 text-left mx-auto
          m-4 p-4'>
        <form onSubmit={handleLogout}>
            <button className='w-full bg-blue-800 text-white my-4 rounded-lg border p-2'>
              Déconnexion confirmée ?
            </button>
        </form>
      </div>
      <Link href={"/"} className=' mt-6 text-gray-700 underline'>Abandon</Link>
  </div>
  )
}




