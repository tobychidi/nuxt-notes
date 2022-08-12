import { PrismaClient } from "@prisma/client"
import { sendError } from "h3"
import { confirmUserContext } from "~~/utils/auth"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const { id } = event.context.params
      const folder = await prisma.folder.findUnique({
         where: {
            id: parseInt(id)
         }
      })
      return folder
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})