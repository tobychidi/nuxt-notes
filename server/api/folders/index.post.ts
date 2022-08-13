import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { confirmUserContext } from "~~/utils/auth"
import { createFolder } from "~~/utils/validation/user"

export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const data = createFolder.parse(await useBody(event))
      const folder = await prisma.folder.create({
         data: {
            name: data.name,
            color: "green",
            userId: user.id
         }
      })
      return folder
   } catch (error) {
      console.log(error)
      sendError(event, createError(error))
   }
})