import Link from 'next/link';

export default function NavbarNotLogged() {
  return (
    <>
        <li ><Link className=' sm:block' href="/login">Connexion</Link></li>
        <li ><Link className=' sm:block' href="/register">S'enregister</Link></li>
    </>

)
}
