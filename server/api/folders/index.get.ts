import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { confirmUserContext } from "~~/utils/auth"

//Get all folders
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