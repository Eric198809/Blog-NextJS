import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/utils/db/connectToDB";
import bcrypt from "bcryptjs/dist/bcrypt";
import slugify from "slugify";

export async function register(formData) {
  const { userName, email, password, passwordRepeat } =
    Object.fromEntries(
      formData
    ); /*Permet de transformer un formdata en objet classqiue pour le destructuring*/

  if (userName.length < 3) {
    throw new Error("Nom d'utlisateur trop court");
  }

  if (password.length < 6) {
    throw new Error("mot de passe trop court");
  }

  if (password !== passwordRepeat) {
    throw new Error("les mots de passe ne sont pas identiques");
  }

  try {
// Connexion à la BDD
    connectToDB();

// Recherche si l'utilisateur n'existe pas déja
    const user = await User.findOne({ userName });
    if (user) {
      throw new Error("l'utilisateur éxiste déja");
    }
// Création d'un slug pour l'utilisateur
    const normalizedUserName = slugify(userName, { lower: true, strict: true });

// Salage et hachache du mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

// Création du nouvel utilisateur
    const newUser = new User({
      userName,
      normalizedUserName,
      email,
      hashedPassword,
    });
    
// Sauvegarde de l'utilisateur
    await newUser.save()

    console.log("Utilisateur créée");

    return { succes: true };
  } catch (error) {
    throw new Error("Echec lors de la création de l'utilisateur", error);
  }
}
