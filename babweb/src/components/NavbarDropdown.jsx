"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

const modulename = "UIX # ";

export default function NavbarDropdown() {
    
    const [isOpen, setIsOpen ] = useState(false);
    const dropDownRef = useRef();
    const router = useRouter();

    // Close Dropdown
    function closeDropDown() {
        setIsOpen(false);
    }
    // Handle a click outside the dropdown
    useEffect( () => {
        document.addEventListener("click", handleClickOutside);
        function handleClickOutside(event) {
            if(!dropDownRef.current.contains(event.target)) {
                closeDropDown();
            }
        }
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [])
    // Switch dropdown status
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    return (
        <div ref={dropDownRef} className="relative">
            <button className="flex" onClick={toggleDropdown}>
                {/* <Image src='/svg/house-solid.svg' alt="" width={24} height={24}></Image> */}
                <span>Administrer</span>
            </button>
            { isOpen && (
                <ul className=" absolute left-0 top-6 w-[200px] border-b border-x border-zinc-300">
                    <li className=" bg-slate-50 hover:bg-slate-200 border-b border-slate-300" >
                        <Link href="/adminbooks" className=" mx-2 text-zinc-900 mr-auto hover:font-bold">Gérer les livres</Link>
                    </li>
                    <li className=" bg-slate-50 hover:bg-slate-200 border-b border-slate-300" >
                        <Link href="/adminusers" className=" mx-2 text-zinc-900 mr-auto hover:font-bold">Gérer les utilisateurs</Link>
                    </li>
                </ul>
            )}
        </div>
    )
}
