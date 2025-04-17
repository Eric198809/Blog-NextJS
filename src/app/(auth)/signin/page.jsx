"use client"

import { useRef } from "react";
import { login } from "@/lib/serverAction/blog/session/sessionServerActions";
import { useRouter } from "next/navigation";
const page = () => {
  const router= useRouter();
  const serverInfoRef = useRef(null);
  const submitButtonRef = useRef(null);

  
  const handleSubmit= async (e)=>{
    e.preventDefault()
serverInfoRef.current.textContent=""
submitButtonRef.current.disabled = true

try {
  const result= await login(new FormData(e.target))
  if (result.success) {
    serverInfoRef.current.textContent= "Connexion réussie"
    router.push("/")
  }
} catch (error) {
  console.error("Erreur de la connexion:", error)
  submitButtonRef.current.disabled= false
  serverInfoRef.current.classList.remove("hidden")
  serverInfoRef.current.textContent= "Identifiant ou mot de passe incorrect"
}

  }

  return (
   <>
   <form onSubmit={handleSubmit} className="max-w-md  mx-auto mt-36">
    <label htmlFor="userName" className="f-label">Votre identifiant</label>
    <input type="text" className="f-auth-input" id="userName" required name="userName" placeholder="Votre identifiant"/>
    <label htmlFor="password" className="f-label">Votre mot de passe</label>
    <input type="password" className="f-auth-input" id="password" required name="password" placeholder="Votre mot de passe"/>
    <button
        ref={submitButtonRef}
        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 mt-5 mb-10 rounded border-none "
      >
        Se connecter
      </button>
      <p ref={serverInfoRef} className=" text-center mb-10 "></p>
   </form>
   
      
   </>
  );
};

export default page;