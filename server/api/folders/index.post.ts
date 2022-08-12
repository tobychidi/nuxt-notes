import { PrismaClient } from "@prisma/client"
import { sendError } from "h3"
import { confirmUserContext } from "~~/utils/auth"
import { createCategory } from "~~/utils/validation/user"

const prisma = new PrismaClient()
export default defineEventHandler(async (event) => {
   try {
      const user = confirmUserContext(event)
      const data = createCategory.parse(await useBody(event))
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