"use client"
import { addPost } from "@/lib/serverAction/blog/postServerActions";
const page = () => {

const handleSubmit= async (e)=>{
  e.preventDefault()
const formData= new FormData(e.target)
const result =await addPost(formData)
}
  return (
   <main className="u-main-container bg-white p-7 mt-32 mb-44">
    <h1 className="text-4xl mb-4">Ecrire un article 🖋️ </h1>
    <form onSubmit={handleSubmit} className="pb-6">
      <label htmlFor="title" className=".f-label"> Titre</label>
      <input 
      type="text"
      name="title"
      placeholder="Titre"
      id="title"
      required // champ obligatoire//
      className=" shadow border rounded w-full p-3 mb-7 text-gray-700 " />
      <label htmlFor="markdownArticle"className="f-label">
        Ecrivez votre article
      </label>
     <textarea name="markdownArticle" id="markdownArticle"required className="min-h-44 text-xl shadow appearance-none border rounded w-full p-8 text-gray-700 mb-4 focus:outline-slate-400" ></textarea>
     <button className="min-w-44 bg-indigo-500 py-3 text-white focus:bg-indigo-800 ">Soumettre</button>
    </form>
   </main>
  );
};

export default page;