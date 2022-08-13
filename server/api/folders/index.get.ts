import { PrismaClient } from "@prisma/client"
import { sendError } from "h3"
import { confirmUserContext } from "~~/utils/auth"

//Get all folders
const prisma = new PrismaClient()
export default defineEventHandler(async (event)=>{
   try {
      const user = confirmUserContext(event)
      const folders = await prisma.folder.findMany({
         where: {
            userId: user.id
         }
      })
      return folders
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})