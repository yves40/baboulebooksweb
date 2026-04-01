import { useContext } from "react"
import Link from 'next/link';
import { AuthContext } from '@/app/context/authContext';
import { useDispatch } from 'react-redux';
import { setAppStatus } from "@/redux/menuProperties"


export default function NavbarLogged() {

    const { getUser } = useContext(AuthContext);
    const dispatch = useDispatch();

    return (
        <>
            <li><Link href="/logout" onClick={() => dispatch(setAppStatus({appstatus: 'public'}))}>Déconnexion</Link></li>
            <li><p className=" text-[calc(var(--menuemailtextsize))]">{getUser().email}</p></li>
        </>
    )
}
