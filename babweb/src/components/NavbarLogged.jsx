import { useContext } from "react"
import Link from 'next/link';
import { AuthContext } from '@/app/context/authContext';


export default function NavbarLogged() {

    const { getUser } = useContext(AuthContext);

    return (
        <>
            <li><Link href="/logout">Déconnexion</Link></li>
            <li><p>{getUser().email}</p></li>
        </>
    )
}
