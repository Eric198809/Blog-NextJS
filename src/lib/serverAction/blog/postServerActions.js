"use server"

import { connectToDB } from "@/lib/utils/db/connectToDB";
import { Post } from "@/lib/models/post";

export const addPost = async (formData) => {
  const { title, markdownArticle } = Object.fromEntries(formData);


try {
  await connectToDB();
  const newPost = new Post({
    title,
    markdownArticle,
  });

  const savedPost = await newPost.save()
  console.log("Post sauvegardé")
  return { succes: true, slug: savedPost.slug }
 
} catch (error) {
  console.log("Erreur lors de la création du post: ", error)
}
};