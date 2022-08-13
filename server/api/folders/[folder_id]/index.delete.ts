import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { confirmUserContext } from "~~/utils/auth"


//* Delete Folder and its Notes
export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const { folder_id } = event.context.params
      const deleteFolder = prisma.folder.delete({
         where: {
            id: parseInt(folder_id)
         }
      })
      const deleteNotes = prisma.note.deleteMany({
         where:{
            folderId: parseInt(folder_id)
         }
      })

      const transaction = await prisma.$transaction([deleteNotes, deleteFolder])
      return "deleted"
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})