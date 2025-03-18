import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-slate-50 border-b border-b-zinc-300">
      <div className="u-main-container py-4 ">
        <Link href="/" className="mr-2 text-zinc-900">
          {" "}
          My Blog
        </Link>
        <Link href="/categories" className="mx-2 text-zinc-900" mr-auto>
          {" "}
          Catégories
        </Link>
        <Link href="/dashboard/create" className="mx-2 text-zinc-900">
          {" "}
          Ajouter un article
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
