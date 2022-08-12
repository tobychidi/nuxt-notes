import { PrismaClient } from "@prisma/client"
import { sendError } from "h3"
import { confirmUserContext } from "~~/utils/auth"
import { createNote } from "~~/utils/validation/user"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const data = createNote.parse(await useBody(event))
      const note = await prisma.note.create({
         data: {
            title: data.title,
            content: data.content,
            authorId: user.id,
            folderId: data.folder_id,
         }
      })
      return note
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})