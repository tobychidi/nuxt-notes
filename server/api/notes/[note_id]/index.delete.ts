import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { confirmUserContext } from "~~/utils/auth"


//* Delete a Note
export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const { note_id } = event.context.params
      const deleteNote = await prisma.note.delete({
         where: {
            id: note_id
         }
      })
      return "deleted"
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})