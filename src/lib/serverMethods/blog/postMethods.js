import { connectToDB } from "@/lib/utils/db/connectToDB";
import {Post} from "@/lib/models/post";

export const getPost = async (slug) => {
  try {
    await connectToDB();
    const post = await Post.findOne({ slug });
    return post
  } catch (error) {
    console.error("Erreur lors de la récupération du post:", error);
  }
};
export const getPosts = async () => {
  try {
    await connectToDB();
    const posts = await Post.find({});
    return posts
  } catch (error) {
    console.error("Erreur lors de la récupération des posts:", error);
  }
};
