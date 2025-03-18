import mongoose from "mongoose";


export const connectToDB = async()=>{
  if (mongoose.connection.readyState) {
    console.log("Using existing connection:", mongoose.connection.name)
    return
    
  }

  try {
    await mongoose.connect(process.env.MONGO)
    console.log("Connecté à la Base de donnée:", mongoose.connection.name );
    
  } catch (err) {
    throw new Error("Echec de la connexion à la base de données")
  }
}