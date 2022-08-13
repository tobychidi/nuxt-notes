import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { confirmUserContext } from "~~/utils/auth"

export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const { note_id } = event.context.params
      const note = await prisma.note.findUnique({
         where: {
            id: parseInt(note_id)
         },
      })
      return note
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})