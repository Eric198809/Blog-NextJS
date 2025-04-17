"use server";

import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";
import AppError from "@/lib/utils/errorHandling/customError";
import { sessionInfo } from "@/lib/serverMethods/blog/session/sessionMethods";

export const addPost = async (formData) => {
  // Récupération des donnés du formData
  const { title, markdownArticle } = Object.fromEntries(formData);

  try {
    // Vérification des données envoyées depiuis le formulaire post. Si ce n'est pas bon on envoi une erreur personnalisé avec AppError (middleware créé dans le dossier "utils=> errorHandling")
    if (typeof title !== "string " || title.trim().length < 3) {
      throw new AppError("Données invalides");
    }

    if (
      typeof markdownArticle !== "string " ||
      markdownArticle.trim().length === 0
    ) {
      throw new AppError("Données invalides");
    }

    // Connexion à la BDD
    await connectToDB();

    // Vérification si l'utilisateur est connecté. Si ce n'est pas bon on envoi une erreur personnalisé avec AppError (middleware créé dans le dossier "utils=> errorHandling")
    const session = await sessionInfo();
    if (!session.success) {
      throw new AppError("Veuillez vous connecter");
    }

    // Création du post
    const newPost = new Post({
      title,
      markdownArticle,
    });

    // Sauvegarde du post
    const savedPost = await newPost.save();
    console.log("Post sauvegardé");

    return { success: true, slug: savedPost.slug };
  } catch (error) {
    console.error("Erreur lors de la création du post:", error);
    // Si l'érreur détecté vient du middleware error Handling => on affiche ce message
    if (error instanceof AppError) {
      throw error;
    }
    // Autrement on affiche ce message
    throw new Error("Une erreur à été détécté lors de la création du post");
  }
};
