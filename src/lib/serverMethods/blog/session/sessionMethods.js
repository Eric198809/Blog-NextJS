// METHODE POUR VERIFIER SI UN UTILISATEUR EST CONNECTE ET RECUPERER SON ID 

import { cookies } from "next/headers";
import { Session } from "@/lib/models/session";
import { User } from "@/lib/models/user";
import { connectToDB } from "@/lib/utils/db/connectToDB";

export const sessionInfo = async()=>{

// Récupération des cookies et de la valuer sessionId
const cookieStore = await cookies()
const sessionId= cookieStore.get("sessionId")?.value

if(!sessionId){
  return {succes: false}
}

await connectToDB()

const session= await Session.findById(sessionId)

if (!sessionId || session.expriresAt < new Date() ) {
  return {succes: false}
}

const user = await User.findById(session.userId)
if (!user) {
  return {succes: false}
}
return {success: true, userId: user._id.toString()}
}