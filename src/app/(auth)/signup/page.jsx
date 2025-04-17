"use client";
import { register } from "@/lib/serverAction/blog/session/sessionServerActions";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const signup = () => {
  const router = useRouter();
  const serverInfoRef = useRef(null);
  const submitButtonRef = useRef(null);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    serverInfoRef.current.classList.add("hidden");
    serverInfoRef.current.textContent = "";
    submitButtonRef.current.textContent = "Création en cours...";
    submitButtonRef.current.disabled = true;
   
    try {
      const result = await register(new FormData(e.target));
   
        submitButtonRef.current.textContent = "Utilisateur crée ";
        let countdown = 3;
        serverInfoRef.current.classList.remove("hidden");
        serverInfoRef.current.textContent = ` Redirection dans ${countdown}`;
        const interval = setInterval(() => {
          countdown -= 1;
          serverInfoRef.current.textContent = `redirection dans ${countdown}`;
          if (countdown === 0) {
            clearInterval(interval);
            router.push("/signin");
          }
        }, 1000);
      
    } catch (error) {
      serverInfoRef.current.textContent = `${error}`;
      serverInfoRef.current.classList.remove("hidden");
      submitButtonRef.current.textContent = "Créer";
      submitButtonRef.current.disabled = false;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-36">
      <label htmlFor="userName" className="f-label">
        Prénom ou pseudo
      </label>
      <input
        type="text"
        id="userName"
        name="userName"
        placeholder="Prénom/Pseudo"
        required
        className="f-auth-input"
      />
      <label htmlFor="email" className="f-label">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        required
        className="f-auth-input"
      />
      <label htmlFor="password" className="f-label">
        Mot de passe
      </label>
      <input
        type="password"
        id="password"
        name="password"
        placeholder="Mot de passe"
        required
        className="f-auth-input"
      />
      <label htmlFor="passwordRepeat" className="f-label">
        Confirmer le mot de passe
      </label>
      <input
        type="password"
        id="passwordRepeat"
        name="passwordRepeat"
        placeholder="Mot de passe"
        required
        className="f-auth-input"
      />
      <button
        ref={submitButtonRef}
        className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 mt-5 mb-10 rounded border-none "
      >
        Créer
      </button>
      <p ref={serverInfoRef} className=" hidden text-center mb-10 "></p>
      <a className=" mb-5  text-blue-600 block text-center" href="/signin">
        {" "}
        Déja un compte ?
      </a>
    </form>
  );
};

export default signup;
