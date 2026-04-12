import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { setAppStatus } from "@/redux/menuProperties"

export default function NavbarNotLogged() {

  const dispatch = useDispatch();

  return (
    <>
        <li key="LOGIN"><Link className=' sm:block' href="/login" onClick={() => dispatch(setAppStatus({appstatus: 'login'}))}>Connexion</Link></li>
        <li key="REGISTER"><Link className=' sm:block' href="/register" onClick={() => dispatch(setAppStatus({appstatus: 'register'}))}>S'enregister</Link></li>
    </>

)
}
