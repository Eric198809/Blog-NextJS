const signup = () => {

  const formData= new FormData()

  return (
    <form className="max-w-md mx-auto mt-36">
      <label htmlFor="userName" className="f-label">
        Prénom ou pseudo
      </label>
      <input
        type="text"
        id="userName"
        name="name"
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
      <label htmlFor="passwordConfirmation" className="f-label">
        Confirmer le mot de passe
      </label>
      <input
        type="password"
        id="passwordConfirmation"
        name="passwordConfirmation"
        placeholder="Mot de passe"
        required
        className="f-auth-input"
      />
      <button  className="w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-4 mt-5 mb-10 rounded border-none ">Créer</button>
      <a className=" mb-5  text-blue-600 block text-center" href="/signin"> Déja un compte ?</a>
    </form>
  );
};

export default signup;
