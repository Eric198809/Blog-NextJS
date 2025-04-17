"use server";

import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import { Session } from "@/lib/models/session";
import { cookies } from "next/headers";
import AppError from "@/lib/utils/errorHandling/customError";

// Créer un utilisateur////////////////////////
export async function register(formData) {
  const { userName, email, password, passwordRepeat } =
    Object.fromEntries(
      formData
    ); /*Permet de transformer un formdata en objet classqiue pour le destructuring*/

  

  try {
// Vérification si le nom a plus de 3 lettres
    if (typeof userName !== "string" || userName.trim().length < 3) {
      throw new AppError("Nom d'utilisateur doit contenir plus de 3 lettres");
    }
    // Vérification si le password a plus de 6 lettres
   
    if (typeof password !== "string" ||password.trim().length < 6) {
      throw new AppError("Le mot de passe doit contenir au moins 6 caractères");
    }
  
    if (password !== passwordRepeat) {
      throw new AppError("Les mots de passe ne sont pas identiques");
    }
// Vérification du format de l'email
    const emailRegex= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (typeof email !== "string"|| !emailRegex.test(email.trim())) {
      throw new AppError("format de l'email non valide")
    }
    // Connexion à la BDD
    await connectToDB();

    // Recherche si l'utilisateur n'existe pas déja
    const user = await User.findOne({ userName });
    if (user) {
      throw new AppError("l'utilisateur existe déja");
    }
// Recherche si l'email n'existe pas déja
    const email= await User.findOne({email})
    if (email) {
      throw new AppError ("Cet email éxiste déja")
    }
    // Création d'un slug pour l'utilisateur
    const normalizedUserName = slugify(userName, { lower: true, strict: true });

    // Salage et hachache du mot de passe
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword);

    // Création du nouvel utilisateur en utilisant le model
    const newUser = new User({
      userName,
      normalizedUserName,
      email,
      password: hashedPassword,
    });

    // Sauvegarde de l'utilisateur
    await newUser.save();

    console.log("Utilisateur créée");

    return { success: true };
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur: ", error);
     if (error instanceof AppError) {
          throw error;
        }
        // Autrement on affiche ce message
        throw new Error("Une erreur à été détécté lors de la création de l'utilisateur");
  }
}

// Log un utilisateur////////////////////////
export async function login(formData) {
  const { userName, password } = Object.fromEntries(formData);
  // ou
  // const userName= formData.get("userName")
  // const password= formData.get("password")

  try {
    // Connexion à la BDD
    await connectToDB();

    // Recherche si l'utilisateur existe
    const user = await User.findOne({ userName: userName });
    if (!user) {
      throw new Error("Mot passe ou identifiant incorrect");
    }

    // Recherche si le mdp est bon
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Mot de passe ou identifiant incorrect");
    }
    let session;
    const existingSession = await Session.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
    });
    if (existingSession) {
      session = existingSession;
      existingSession.expiresAt = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      );
      await existingSession.save();
    } else {
      // Envoi des information a la bdd pour la création de la session
      session = new Session({
        userId: user._id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      await session.save();
    }

    // Création du cookie
    const cookieStore = await cookies();
    cookieStore.set("sessionId", session._id.toString(), {
      // Ne sera pas lisible avec une requete javascript coté client
      httpOnly: true,
      // En production il ne sera envoyer que en requete sécurisé HTTPS
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // Durée de vie
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "Lax",
    });

    return { success: true };
  } catch (error) {
    console.error("erreur lors de l'athentification", error);
    return { success: false, message: error.message };
  }
}

// Déconnecter un utilisateur////////////////////////
export async function logOut() {
  const cookieStore = cookies();
  const sessionId = cookieStore.get("sessionId")?.value;

  try {
    await Session.findByIdAndDelete(sessionId);
    cookieStore.set("sessionId", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      // Supprime le cookie
      maxAge: 0,
      sameSite: "strict",
    });

    console.log("cookies supprimé");
    return { succes: true };
  } catch (error) {
    console.log(error);
  }
}

// fonction que indique si on est sur une page privée/////////////////////////////
export async function isPrivatePage(pathname){
  const privateSegment= ["/dasboard", "/setting/profile"]

// Si ça commence par PrivateSegment ou si il y autre chose après = privée//
// Exemple : /dashboard , /dashboard/edit
return privateSegment.some(segment=> pathname === segment || pathname.startsWith(segment+ "/"))
}