import Link from "next/link";
import { sessionInfo } from "@/lib/serverMethods/blog/session/sessionMethods";
import NavbarDropDown from "./NavbarDropDown";
const Navbar = async () => {
  const session = await sessionInfo();
  console.log(session);

  return (
    <nav className="fixed w-full bg-slate-50 border-b border-b-zinc-300">
      <div className="u-main-container py-4 flex justify-between">
        <div className="">
          <Link href="/" className="mr-2 text-zinc-900">
            {" "}
            My Blog
          </Link>
          <Link href="/categories" className="mx-2 text-zinc-900" mr-auto>
            {" "}
            Catégories
          </Link>
          </div>
          <div className="flex gap-4 align-middle">
          {session.success ? (
            <>
              <Link href="/dashboard/create" className="mx-2 text-zinc-900">
                {" "}
                Ajouter un article
              </Link>
              <NavbarDropDown />
            </>
          ) : (
            <div className="">
              <Link href="/signin" className="mx-auto text-zinc-900">
                {" "}
                Connexion
              </Link>
              <Link href="/signup" className="mx-2 text-zinc-900">
                {" "}
                Créer un compte
              </Link>
            </div>
          )}</div>
        
      </div>
    </nav>
  );
};

export default Navbar;
