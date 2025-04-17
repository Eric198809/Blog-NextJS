"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  logOut,
  isPrivatePage,
} from "@/lib/serverAction/blog/session/sessionServerActions";

const NavbarDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    // Déconnexion
    await logOut();

    // Si c'est une page privée on redirige vers la page signin.
    // Récupere le pathname apres http://localhost:3000/
    if (isPrivatePage(window.location.pathname)) {
      router.push("/signin");
    }
  };

  // const closeDropDown = () => {
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   const handleClickOutside = (e) => {
  //     if (!dropDownRef.current.contains(e.traget)) {
  //       closeDropDown();
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  // }, []);

  return (
    <div ref={dropDownRef} className="relative ">
      <button className="flex" onMouseEnter={toggleDropdown}>
        <img src="/icons/user.svg" alt="icone" width={24} height={24} />
      </button>
      {isOpen && (
        <ul className="absolute left-0 top-10 w-[250px] border-b border-x border-zinc-300">
          <li className=" bg-slate-50 hover:bg-slate-200">
            <Link className=" block p-4" href="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className=" bg-slate-50 hover:bg-slate-200">
            <button className="w-full p-4 text-left" onClick={handleLogOut}>
              Se déconnecter
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavbarDropDown;
