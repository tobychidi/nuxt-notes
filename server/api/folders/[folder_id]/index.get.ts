import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { confirmUserContext } from "~~/utils/auth"


//* Get Folder and its Notes
export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const { folder_id } = event.context.params
      const folder = await prisma.folder.findUnique({
         where: {
            id: parseInt(folder_id)
         },
         include: {
            notes: {
               orderBy: {
                  updatedAt: 'desc'
               }
            },
         }
      })
      return folder
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})