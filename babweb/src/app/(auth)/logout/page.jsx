"use client"

import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getAuthContext } from '@/app/context/authContext';
import { deleteSessionCookie } from '@/server/security/Sessions';
import { deleteUserCookie } from '@/server/security/Users';
import { closeDBSession } from '@/server/security/Sessions';
import { useDispatch } from "react-redux";
import { disconnectUser } from "@/redux/menuProperties";
import Logger from '@/classes/logger';


export default function page() {
  
  const {getUser, logoutUser, closeSession, getSession} = getAuthContext();
  const router = useRouter(); 
  const dispatch = useDispatch();
  const logger = new Logger();

  async function handleLogout(e) {
    e.preventDefault();
    logger.info(`Log out for : ${getUser().email}`);
    // AuthContext update
    await logoutUser();
    await closeSession();
    // DB and cookies update
    const session = getSession();
    const sessionid = await session.getSessionId();
    logger.info(`Shoot DB session with ID : ${sessionid} `);
    await closeDBSession(sessionid);
    await deleteSessionCookie();
    await deleteUserCookie();
    const dispatchObj =  dispatch(disconnectUser());
    
    router.push('/');
  }    

  return (
    <div className='body__container page__container background-slate-500'>
      <h1 className='mb-10 text-2xl'>Déconnexion</h1>
      <div className='w-3/4 md:w-1/3 border rounded shadow-md background-slate-900 text-left mx-auto
          m-4 p-4'>
        <form onSubmit={handleLogout}>
            <div className="text-center">
              <button className='w-[180px] bg-blue-800 text-white my-4 rounded-lg border p-2'>
                Confirmée ?
              </button>
            </div>

        </form>
      </div>
      <Link href={"/"} className=' mt-6 text-gray-700 underline'>Abandon</Link>
  </div>
  )
}




