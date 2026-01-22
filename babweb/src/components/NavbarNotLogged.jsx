import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setAppStatus } from "@/redux/menuProperties"

export default function NavbarNotLogged() {

  const dispatch = useDispatch();

  return (
    <>
        <li ><Link className=' sm:block' href="/login" onClick={() => dispatch(setAppStatus({appstatus: 'login'}))}>Connexion</Link></li>
        <li ><Link className=' sm:block' href="/register" onClick={() => dispatch(setAppStatus({appstatus: 'register'}))}>S'enregister</Link></li>
    </>

)
}
