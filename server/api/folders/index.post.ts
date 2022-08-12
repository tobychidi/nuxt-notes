import { PrismaClient } from "@prisma/client"
import { sendError } from "h3"
import { confirmUserContext } from "~~/utils/auth"
import { createFolder } from "~~/utils/validation/user"

const prisma = new PrismaClient()
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